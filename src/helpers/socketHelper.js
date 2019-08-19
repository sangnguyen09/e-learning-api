export const pushSocketIdToArray = (clients, currentUserId, sockerId) => {
    if (clients[currentUserId]) { // neeu  tồn tại user trong object rồi thì push tiếp vào mảng userid đó
        clients[currentUserId].push(sockerId)
    } else { // chưa co userId nào thì khởi tạo nó
        clients[currentUserId] = [sockerId]
    }
    return clients
}
export const emitNotifyToArray = (clients,contactId,io, eventname,data) => {
 
        clients[contactId].map(socketId => io.sockets.connected[socketId].emit(eventname, data ))
}
export const removeSocketIdFromArray  = (clients,currentUserId,socket) => {
    clients[currentUserId] = clients[currentUserId].filter(socketId => socketId !== socket.id)
    if (!clients[currentUserId].length) {
        delete clients[currentUserId]
    }
    return clients
}