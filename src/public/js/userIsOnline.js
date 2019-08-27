//step :0 
socket.emit('check-status')

// step1:
socket.on('server_send_listUsers_online', function(listUserIds){
    listUserIds.forEach(userId =>{
        $(`.person[data-chat=${userId}]`).find('div.dot').addClass('online');
        $(`.person[data-chat=${userId}]`).find('div>img').addClass('avatar-online');
    })
})
// step2: khi một thăng online thì hiên lên cho thằng khác
socket.on('server_send_user_online', function(userId){
        $(`.person[data-chat=${userId}]`).find('div.dot').addClass('online');
        $(`.person[data-chat=${userId}]`).find('div>img').addClass('avatar-online');
})

// step3: khi một thăng offline
socket.on('server_send_user_offline', function(userId){
        $(`.person[data-chat=${userId}]`).find('div.dot').removeClass('online');
        $(`.person[data-chat=${userId}]`).find('div>img').removeClass('avatar-online');
})
