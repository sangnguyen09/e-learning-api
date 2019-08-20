import {
    pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray
} from '../../helpers/socketHelper'
/**
 * 
 * @param {*} io from socket.io lib
 */

let removeRequestContactSent = (io) => {
    let clients = {}

    io.on('connection', (socket) => {

        // push socketid to array
        let currentUserId = socket.request.user._id
      clients = pushSocketIdToArray(clients, currentUserId, socket.id)

        socket.on('remove_request_contact-sent', (data) => { //socket.emit('add-new-contact',{contactId:targetId})

            let currentUser = {
                id: socket.request.user._id,
            };

            //chi day thong bao cho nguoi dung dc gui ket ban// khi dang online moi push
            if (clients[data.contactId]) {
                emitNotifyToArray(clients,data.contactId,io,'response_remove_request_contact_sent',currentUser)
            }
        });

        socket.on('disconnect', () => { // khi ng dung f5 hoac thoat trinh duyet thi xoa cai socket id do di
         clients = removeSocketIdFromArray(clients,currentUserId,socket)
        })
    })
}

module.exports = removeRequestContactSent