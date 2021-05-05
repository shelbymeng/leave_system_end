import EStudentState from '../enum/EStudentState';
import EApproveState from '../enum/EApproveSatte';

interface IState {
    orderId: string;
    approveState: string;
    approver: string;
}
export default IState;
