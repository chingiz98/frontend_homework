import React from 'react';
import {Card, Statistic, DatePicker, List, Avatar, Icons, Typography} from "antd";
import ReactScrollableList from "react-scrollable-list";
import { ArrowDownOutlined } from '@ant-design/icons';
import { ArrowUpOutlined } from '@ant-design/icons';
import {getTransactionsRequest, dismissError} from "../actions/accountsActions";
import {connect} from "react-redux";
const { RangePicker } = DatePicker;
const { Text } = Typography;

const mapStateToProps = (state, parentProps) => ({
    transactionsLoading: state.accounts.transactionsLoading,
    transactions: state.accounts.transactions,
    error: state.accounts.error,
    makingDeposit: state.accounts.makingDeposit,
    makingTransfer: state.accounts.makingTransfer
});


const mapDispatchToProps = {
    getTransactionsRequest,
    dismissError
}

class HistoryTab extends React.Component {

    state = {

    };

    componentDidMount = () => {
        this.props.getTransactionsRequest(this.props.displayedAccount.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('124');
        if(prevProps.displayedAccount.id !== this.props.displayedAccount.id){
            this.props.getTransactionsRequest(this.props.displayedAccount.id);
        }
    }

    getListItem = (item) => {

        let title;
        let description;
        let avatar;

        if(item.type === 'transaction' && item.to_id !== this.props.displayedAccount.id){
            title = 'Transfer to ' + item.to_id;
            description = <Text style={{color:"#f5222d"}}>{'-' + item.amount}</Text>;
            avatar = <ArrowUpOutlined />;
        } else if (item.type === 'transaction' && item.to_id === this.props.displayedAccount.id){
            title = 'Transfer from ' + item.from_id;
            description = <Text style={{color:"#52c41a"}}>{'+' + item.amount}</Text>;
            avatar = <ArrowDownOutlined />;
        }

        if(item.type === 'deposit'){
            title = 'Deposit';
            description = <Text style={{color:"#52c41a"}}>{'+' + item.amount}</Text>;
            avatar = <ArrowDownOutlined />;
        }

        return (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar icon={avatar} />}
                    title={title}
                    description={description}
                />
            </List.Item>
        );
    }


    render() {
        const { accounts, displayedAccount, transactions, makingTransfer, makingDeposit } = this.props;

        if(makingTransfer || makingDeposit){
            this.props.getTransactionsRequest(this.props.displayedAccount.id);
        }

        return(
            <div>
                <Card size="default" title="Operations history" extra={<RangePicker/>} style={{width:"fit-content" , minWidth: 500, marginTop: 10 }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.transactionsLoading ? [] : transactions}
                        renderItem={item => (
                            this.getListItem(item)
                        )}
                    />
                </Card>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(HistoryTab);