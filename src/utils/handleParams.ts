function handleLeaveType(type: number) {
    switch (type) {
        case 0:
            return '离校';
        case 1:
            return '课程请假';
    }
}
export { handleLeaveType };
