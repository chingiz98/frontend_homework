import React from 'react';
import { connect } from 'react-redux'
import { getAccountsRequest, setDisplayedAccount, dismissError } from '../actions/accountsActions';
import { getInfoRequest, updateInfoRequest, dismissUserError } from '../actions/user.actions'
import { Redirect } from 'react-router-dom'
import {
    Avatar,
    PageHeader,
    Button,
    Statistic,
    Spin,
    Typography,
    message,
    Input,
    Modal
} from 'antd';
import { UserOutlined, LogoutOutlined, LoadingOutlined } from '@ant-design/icons';
import Text from "antd/lib/typography/Text";
import AccountsTabs from "../components/AccountsTabs";
import utils from "../utils";
const { Title } = Typography;
const { confirm } = Modal;


const mapStateToProps = (state, parentProps) => ({
    loading: state.accounts.loading,
    error: state.accounts.error,
    accounts: state.accounts.accountsList,
    displayedAccount: state.accounts.displayedAccount,
    displayedUser: state.user.displayedUser,
    loadingUser: state.user.loadingUser,
    updatingUser: state.user.updatingUser,
    userError: state.user.error
});


const mapDispatchToProps = {
    getAccountsRequest,
    setDisplayedAccount,
    dismissError,
    getInfoRequest,
    updateInfoRequest,
    dismissUserError
}

let usernameInput = React.createRef();
let nameInput = React.createRef();

class AccountListContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedOut: false,
            userInfoModalVisible: false,
            usernameChanged: false
        }

    }


    componentDidMount = () => {
        this.props.getAccountsRequest();
        this.props.getInfoRequest();
    }


    logout = () => {
        utils.removeAccessToken();
        this.setState({
            loggedOut: true
        })
    }

    showUserInfoModal = () => {
        this.setState({
            userInfoModalVisible: true,
        });
    };

    updateUserInfo = () => {
        let username = usernameInput.current.state.value;
        let name = nameInput.current.state.value;
        if(!username){
            message.error('Username is required', 1);
            return;
        }
        if(this.props.displayedUser.username !== username){
            this.showChangeInfoConfirm(username, name);
            return;
        }
        if(!name) {
            message.error('Name is required', 1);
            return;
        }
        this.props.updateInfoRequest(username, name);
        this.setState({
            userInfoModalVisible: false,
        });
    };

    showChangeInfoConfirm = (username, name) => {

        confirm({
            centered: true,
            title: 'If you will change username or password, you will be logged out. Do you want to proceed?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.props.updateInfoRequest(username, name);
                utils.removeAccessToken();
                this.setState({
                    userInfoModalVisible: false,
                    usernameChanged: true
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    cancelUserInfoModal = () => {
        this.setState({
            userInfoModalVisible: false,
        });
    };


    render() {
        const { displayedAccount, error, accounts, loading, displayedUser, updatingUser, userError } = this.props;

        let totalBalance = 0;

        if(accounts){
            accounts.forEach(function(item) {
                totalBalance += item.amount;
            });
        }

        if(loading) {
            return(
                <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection:"column", height:"100vh"}}>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />}/>
                </div>
            );
        }



        if(this.state.loggedOut || this.state.usernameChanged){
            return <Redirect to="/login"/>
        }


        if(error) {
            if(error.Code === 401)
                return <Redirect to="/login"/>
            message.error(error.Message, 1);
            this.props.dismissError();
        }

        if(userError) {
            message.error(userError.Message, 1);
            this.props.dismissUserError();
        }



        return (
            <div>
                <PageHeader
                    className="site-page-header-responsive"
                    title={<div><Text>Total balance:</Text> <Statistic value={totalBalance} groupSeparator="" precision={2} /> </div>}
                    extra={[
                            <div>
                                <Typography.Text strong={true} style={{fontSize:18}}>{loading ? "Loading user" : displayedUser.name}</Typography.Text>
                                <a href="#"><Avatar onClick={this.showUserInfoModal} style={{marginLeft:8}} size={32} icon={<UserOutlined />} /></a>
                                <Button onClick={() => {this.logout()}} style={{marginLeft:0}} type="primary" shape="round" icon={<LogoutOutlined />}/>
                            </div>

                    ]}
                    footer={
                        <AccountsTabs accounts={accounts} displayedAccount={displayedAccount}/>
                    }
                >
                </PageHeader>
                <Modal
                    centered={true}
                    width={350}
                    title="User information"
                    visible={this.state.userInfoModalVisible}
                    onOk={this.updateUserInfo}
                    onCancel={this.cancelUserInfoModal}
                    confirmLoading={updatingUser}
                >
                    <div >
                        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection:"column"}}>
                            <Avatar  onClick={this.showUserInfoModal}  size={84} icon={<UserOutlined/>} />
                        </div>
                    <Title level={4} style={{marginTop:8}}>Username:</Title>
                    <Input ref={usernameInput} placeholder="Username (e-mail)" defaultValue={displayedUser.username}/>
                        <Title level={4} style={{marginTop:8}}>Name:</Title>
                    <Input ref={nameInput}  placeholder="Name" defaultValue={displayedUser.name} />
                    </div>
                </Modal>
            </div>

        );
    }

}

export default connect(
    mapStateToProps, mapDispatchToProps
)(AccountListContainer);