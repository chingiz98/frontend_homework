import React from 'react';
import {Card, message, Statistic} from "antd";
import {Input, Tabs, Button, Typography, Modal, Cascader, Checkbox} from 'antd';
import {addAccountRequest, setDisplayedAccount, deleteAccountRequest, makeDepositRequest, makeTransferRequest } from "../actions/accountsActions";
import {connect} from "react-redux";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import HistoryTab from "./HistoryTab.jsx";
const { TabPane } = Tabs;
const { confirm } = Modal;
const { Title } = Typography;


const mapStateToProps = (state, parentProps) => ({
    accountAdding: state.accounts.accountAdding,
    error: state.accounts.error,
    accounts: state.accounts.accountsList,
    displayedAccount: state.accounts.displayedAccount
});


const mapDispatchToProps = {
    setDisplayedAccount,
    addAccountRequest,
    deleteAccountRequest,
    makeDepositRequest,
    makeTransferRequest
}

let accountNameInput = React.createRef();
let depositAmountInput = React.createRef();
let transferAmountInput = React.createRef();
let transferCommentInput = React.createRef();
let transferDestinationDropDown = React.createRef();
let transferDestinationInput = React.createRef();

class AccountsTabs extends React.Component {

    state = {
        newAccountModalVisible: false,
        depositModalVisible: false,
        transferModalVisible: false,
        transferAccCheckBox: false,
    };

    tab = (a) => {

        const content =
            <Card size="default" title={a.name} style={{ width:"fit-content" , minWidth: 500, marginTop: 10 }}>
                <div style={{}}>
                    <div style={{ float: "left"}}>
                        <Statistic title="Account number" groupSeparator="" value={a.id} />
                        <Statistic title="Balance"  value={a.amount} />
                    </div>
                    <div style={{display: "flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
                        <div><Button onClick={this.showDepositModal} type="primary" style={{width: 100, marginLeft:80}}>Deposit</Button></div>
                        <div><Button onClick={this.showTransferModal} type="primary" style={{ marginTop: 8, width: 100, marginLeft:80}}>Transfer</Button></div>
                        <div><Button onClick={this.showDeleteConfirm} type="primary" danger style={{ marginTop: 8, width: 100, marginLeft:80}}>Close</Button></div>
                    </div>
                </div>

            </Card>;


        return (
            <TabPane tab={<Title level={4} style={{marginTop:6, marginLeft: 12}}>{a.name}</Title>} key={a.id}>
                {content}
                <HistoryTab displayedAccount={this.props.displayedAccount}/>
            </TabPane>
        )
    }

    showDeleteConfirm = () => {

        confirm({
            centered: true,
            title: 'Are you sure want to close this account?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: this.deleteDisplayedAccount,
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    deleteDisplayedAccount = () => {
        this.props.deleteAccountRequest(this.props.displayedAccount.id);
    }

    showAccountCreationModal = () => {
        this.setState({
            newAccountModalVisible: true,
        });
    };
    createAccount = e => {
        console.log(e);
        if(!accountNameInput.current.state.value){
            message.error("Name can't be empty", 1);
            return;
        }
        this.props.addAccountRequest(accountNameInput.current.state.value);
        this.setState({
            newAccountModalVisible: false,
        });
        accountNameInput.current.state.value = "";
    };
    cancelAccountCreation = e => {
        console.log(e);
        this.setState({
            newAccountModalVisible: false,
        });
    };
    showDepositModal = () => {
        this.setState({
            depositModalVisible : true,
        });
    };

    isNumeric = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    makeDeposit = e => {
        console.log(e);
        if(!depositAmountInput.current.state.value){
            message.error("Deposit amount can't be empty", 1);
            return;
        }

        if(depositAmountInput.current.state.value <= 0){
            message.error("Deposit amount can't less or equal to 0", 1);
            return;
        }


        if(!this.isNumeric(depositAmountInput.current.state.value)){
            message.error("Deposit amount should be number", 1);
            return;
        }


        this.props.makeDepositRequest(this.props.displayedAccount.id, depositAmountInput.current.state.value)

        this.setState({
            depositModalVisible: false,
        });
        depositAmountInput.current.state.value = "";


    };


    cancelDeposit = e => {
        console.log(e);
        this.setState({
            depositModalVisible : false
        });
    };
    showTransferModal = () => {
        this.setState({
            transferModalVisible : true,
        });
    }
    makeTransfer = e => {
        console.log(e);

        let fromId = this.props.displayedAccount.id;
        let toId;

        if(this.state.transferAccCheckBox){
            toId = transferDestinationInput.current.state.value;
        } else {
            toId = transferDestinationDropDown.current.state.value[0];
        }

        let amount = transferAmountInput.current.state.value;
        let comment = transferCommentInput.current.state.value;

        if(!amount){
            message.error("Transfer amount can't be empty", 1);
            return;
        }

        if(!this.isNumeric(amount)){
            message.error("Transfer amount should be number", 1);
            return;
        }

        if(!toId){
            message.error("Destination account is not selected", 1);
            return;
        }

        this.props.makeTransferRequest(fromId, parseInt(toId), amount, comment);
        this.setState({
            transferModalVisible: false,
        });

        transferAmountInput.current.state.value = "";
        transferCommentInput.current.state.value = "";
        transferDestinationInput.current.state.value = "";
        transferDestinationDropDown.current.state.value = [];

    };
    cancelTransfer = e => {
        console.log(e);
        this.setState({
            transferModalVisible: false,
        });
    };

    showCreateNewAccountModal = () => {
        return (
            <Modal
                centered={true}
                width={250}
                title="New account"
                visible={this.state.newAccountModalVisible}
                onOk={this.createAccount}
                onCancel={this.cancelAccountCreation}
                confirmLoading={this.props.accountAdding}
            >
                <Input ref={accountNameInput} placeholder="AccountName"/>
            </Modal>
        )
    }

    render() {
        const { accounts, displayedAccount, makingDeposit, makingTransfer } = this.props;
        if(!accounts.length) {
            return (
                <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection:"column", height:"65vh"}}>
                    <Title level={3}>You have no accounts</Title>
                    <Button type="primary" onClick={this.showAccountCreationModal} style={{ marginTop:8 }}>
                        Create new
                    </Button>
                    {this.showCreateNewAccountModal()}
                </div>
            )
        }

        const opt = [];

        accounts.forEach(function(account) {
            opt.push({
                value: account.id,
                label: account.id + " (" + account.name + ")"
            })
        });

        return(
            <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection:"column", minWidth: 800}}>
                <div style={{float:"left"}}><Typography.Title level={2}>Accounts</Typography.Title></div>
                <div>
                <Tabs animated={false} style={{width:"fit-content", maxWidth:700}}
                      tabPosition="right"

                      activeKey={displayedAccount.id.toString()}
                      onChange={(activeKey) =>{
                          this.props.setDisplayedAccount(parseInt(activeKey));
                          console.log("test");
                      }}
                      tabBarExtraContent = {
                          <Button type="primary" onClick={this.showAccountCreationModal} style={{marginLeft: 8, marginTop:8}}>
                              Create new
                          </Button>}>
                    {accounts.map((a) => this.tab(a))}
                </Tabs>
                </div>
                {this.showCreateNewAccountModal()}

                <Modal
                    centered={true}
                    width={250}
                    title="Enter deposit amount"
                    visible={this.state.depositModalVisible}
                    onOk={this.makeDeposit}
                    onCancel={this.cancelDeposit}
                    confirmLoading={makingDeposit}
                >
                    <Input ref={depositAmountInput} placeholder="Amount" />
                </Modal>
                <Modal
                    centered={true}
                    width={350}
                    title="Make transfer"
                    visible={this.state.transferModalVisible}
                    onOk={this.makeTransfer}
                    onCancel={this.cancelTransfer}
                    confirmLoading={makingTransfer}
                >
                    <Title level={4}>Transfer amount:</Title>
                    <Input ref={transferAmountInput} placeholder="Amount" />
                    <Title level={4} style={{marginTop:8}}>Transfer comment:</Title>
                    <Input ref={transferCommentInput} placeholder="Comment" />
                    <Title level={4} style={{marginTop:8}}>Destination account:</Title>
                    <Cascader ref={transferDestinationDropDown} style={{display:"flex"}} disabled={this.state.transferAccCheckBox} options={opt} placeholder="Please select" />
                    <Checkbox style={{marginTop:8}} onChange={() => {this.setState({transferAccCheckBox: !this.state.transferAccCheckBox})}}>Enter manually</Checkbox>
                    <Input ref={transferDestinationInput} maxLength={10} disabled={!this.state.transferAccCheckBox} style={{marginTop:8}} placeholder="Destination account id"/>
                </Modal>
            </div>

        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(AccountsTabs);