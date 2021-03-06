import addNewContact from './contact/addNewContact'
import removeRequestContactSent from './contact/removeRequestContactSent'
import removeRequestContactReceived from './contact/removeRequestContactReceived'
import { approveRequestContactReceived } from './contact/approveRequestContactReceived';
import { removeContact } from './contact/removeContact';
import { chatTextEmoji } from './chats/chatTextEmoji';
import { typingOn } from './chats/typingOn';
import { typingOff } from './chats/typingOff';
import { chatImage } from './chats/chatImage';
import { chatAttachment } from './chats/chatAttachment';
import { chatVideo } from './chats/chatVideo';
import { userIsOnline } from './status/userIsOnline';
import { newGroupChat } from './group/newGroupChat';

/**
 *
 * @param {*} io from socket.io lib
 */
let initSockets = (io)=>{
    addNewContact(io);
    removeRequestContactSent(io);
    removeRequestContactReceived(io);
	approveRequestContactReceived(io);
    removeContact(io);
    chatTextEmoji(io);
    typingOn(io);
    typingOff(io);
    chatImage(io);
    chatAttachment(io);
    chatVideo(io);
    userIsOnline(io);
    newGroupChat(io);
    
}
module.exports = initSockets;
