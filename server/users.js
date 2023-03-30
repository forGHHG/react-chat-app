const users = [];

/* 사용자 추가 */
const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // 같은 방에 같은 이름의 유저 접속 방지
    const existingUser = users.find((user) => user.room === room && user.name === name);

    if (!name || !room) return {error: '이름과 방이 입력되지 않았습니다.'};
    if (name === 'admin') return {error : 'admin은 사용할 수 없는 이름입니다.'};
    if (existingUser) return {error : '이미 존재하는 이름입니다.'};

    const user = {id, name, room};
    users.push(user);
    
    return {user};
}

/* 사용자 삭제 */
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    
    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

/* 사용자 조회 */
const getUser = (id) => users.find((user) => user.id === id);

/* 방 안의 모든 사용자 조회 */
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {addUser, removeUser, getUser, getUsersInRoom};