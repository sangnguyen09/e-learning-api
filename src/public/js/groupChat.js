function addFriendsToGroup() {
  $("ul#group-chat-friends")
    .find("div.add-user")
    .bind("click", function() {
      let uid = $(this).data("uid");
      $(this).remove();
      let html = $("ul#group-chat-friends")
        .find("div[data-uid=" + uid + "]")
        .html();

      let promise = new Promise(function(resolve, reject) {
        $("ul#friends-added").append(html);
        $("#groupChatModal .list-user-added").show();
        resolve(true);
      });
      promise.then(function(success) {
        $("ul#group-chat-friends")
          .find("div[data-uid=" + uid + "]")
          .remove();
      });
    });
}

function cancelCreateGroup() {
  $("#btn-cancel-group-chat").bind("click", function() {
    $("#groupChatModal .list-user-added").hide();
    if ($("ul#friends-added>li").length) {
      $("ul#friends-added>li").each(function(index) {
        $(this).remove();
      });
    }
  });
}

function callSearchFriend(element) {
  if (element.which === 13 || element.type === "click") {
    // 13 la phim ENTER
    let keyword = $("#input-search-friends-to-add-group-chat").val();
    let regexKeyword = new RegExp(
      /^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/
    );

    if (!keyword.length) {
      alertify.notify("Chưa nhập nội dung tìm kiếm ", "error", 7);
      return;
    }
    if (!regexKeyword.test(keyword)) {
      alertify.notify(
        "Chỉ cho phép kí tự chữ cái và số, khoảng trắng ",
        "error",
        7
      );
      return;
    }
    $.get(`/contact/search-friends/${keyword}`, function(data) {
      $("ul#group-chat-friends").html(data);
      // Thêm người dùng vào danh sách liệt kê trước khi tạo nhóm trò chuyện
      addFriendsToGroup();

      // Action hủy việc tạo nhóm trò chuyện
      cancelCreateGroup();
    });
  }
}
function callCreateChat() {
  $("#btn-create-group-chat")
    .unbind("click")
    .on("click", function() {
      let countUsers = $("ul#friends-added").find("li");
      if (countUsers.length < 2) {
        alertify.notify(
          "Vui lòng chọn thêm bạn bè tối thiểu 2 người!",
          "error",
          7
        );
        return;
      }
      let groupChatName = $("#input-name-group-chat").val();
      //   if (groupChatName.length < 5 || groupChatName.length > 30) {
      //     alertify.notify("Vui lòng nhập tên nhóm từ 5 đến 30 kí tự", "error", 7);
      //     return;
      //   }
      let arrayIds = [];
      $("ul#friends-added")
        .find("li")
        .each(function(imdex, item) {
          arrayIds.push({ userId: $(item).data("uid") });
        });
      Swal.fire({
        title: `Bạn có chắc chắn muốn tạo nhóm &nbsp; ${groupChatName}`,
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#2ECC71",
        cancelButtonColor: "#ff7675",
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy bỏ"
      }).then(result => {
        if (!result.value) {
          return;
        }
        $.post("/group-chat/add-new", { arrayIds, groupChatName }, function(
          data
        ) {
          // buoc 1: hide modal
          $("#input-name-group-chat").val("");
          $("#btn-cancel-group-chat").click();
          $("#groupChatModal").modal("hide");

          // Buoc 2 handel leftSide.js
          let subGroupChatName = data.newChatGroup.name;
          if (subGroupChatName.length > 15) {
            subGroupChatName = subGroupChatName.substr(0, 14);
          } else {
          }
          let leftSideData = `
                    <a href="#uid_${data.newChatGroup._id}" class="room-chat" data-target="#to_${data.newChatGroup._id}">
                    <li class="person" data-chat="${data.newChatGroup._id}">
                        <div class="left-avatar">
                            <img src="images/users/group-avatar-trungquandev.png" alt="">
                        </div>
                        <div class="info-name">
                            <span class="name">
                            <span class="group-chat-name">
                            ${subGroupChatName} <span>...</span>
                             </span>
                             </span>
                                    <span class="preview convert-emoji">
                               
                            </span>

                        </div>
                        <span class="time">
                       
                            </span>
                    </li>
                </a>
        
        `;

          $("#all-chat")
            .find("ul")
            .prepend(leftSideData);
          $("#group-chat")
            .find("ul")
            .prepend(leftSideData);

          // step 3 hadel rightSide;
          let rightSideData = `
        <div class="right tab-pane" data-chat="${data.newChatGroup._id}"
        id="to_${data.newChatGroup._id}">
        <div class="top">
            <span>To: <span class="name">${data.newChatGroup.name}</span></span>
            <span class="chat-menu-right">
                <a href="#attachmentsModal_${data.newChatGroup._id}" class="show-attachments" data-toggle="modal">
                    Tệp đính kèm
                    <i class="fa fa-paperclip"></i>
                </a>
            </span>
            <span class="chat-menu-right">
                <a href="javascript:void(0)">&nbsp;</a>
            </span>
            <span class="chat-menu-right">
                <a href="#imagesModal_${data.newChatGroup._id}" class="show-images" data-toggle="modal">
                    Hình ảnh
                    <i class="fa fa-photo"></i>
                </a>
            </span>
            <span class="chat-menu-right">
                <a href="javascript:void(0)">&nbsp;</a>
            </span>
            <span class="chat-menu-right">
                <a href="javascript:void(0)" class="number-members" >
                    <span class="show-number-members">${data.newChatGroup.userAmount}</span>
                    <i class="fa fa-users"></i>
                </a>

            </span>
            <span class="chat-menu-right">
                <a href="javascript:void(0)">&nbsp;</a>
            </span>
            <span class="chat-menu-right">
                <a href="javascript:void(0)" class="number-messages" >
                    <span class="show-number-messages">${data.newChatGroup.messageAmount}</span>
                    <i class="fa fa-comment-o"></i>
                </a>

            </span>
        </div>
        <div class="content-chat">
            <div class="chat chat-in-group" data-chat="${data.newChatGroup._id}">
                

            </div>
        <div class="typing-chat" data-chat="${data.newChatGroup._id}"></div>

        </div>
                <div class="write" data-chat="${data.newChatGroup._id}">
                    <input type="text" class="write-chat chat-in-group" id="write-chat-${data.newChatGroup._id}"
                        data-chat="${data.newChatGroup._id}">
                    <div class="icons">
                        <a href="#" class="icon-chat" data-chat="${data.newChatGroup._id}"><i class="fa fa-smile-o"></i></a>
                        <label for="image-chat-${data.newChatGroup._id}">
                            <input type="file" id="image-chat-${data.newChatGroup._id}" name="my-image-chat" class="image-chat chat-in-group"
                                data-chat="${data.newChatGroup._id}">
                            <i class="fa fa-photo"></i>
                        </label>
                        <label for="attachment-chat-${data.newChatGroup._id}">
                            <input type="file" id="attachment-chat-${data.newChatGroup._id}" name="my-attachment-chat" class="attachment-chat chat-in-group"
                                data-chat="${data.newChatGroup._id}">
                            <i class="fa fa-paperclip"></i>
                        </label>
                        <a href="javascript:void(0)" id="video-chat-group">
                            <i class="fa fa-video-camera"></i>
                        </a>
                    </div>
                </div>
            </div>
        
        `;
          $("#screen-chat").prepend(rightSideData);

          // buoc 4: call changeScreen Chat
          changeSreenChat();

          // Buoc 5 hadel imagemodal
          let imageModalData = `<div class="modal fade" id="imagesModal_${data.newChatGroup._id}" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Những hình ảnh trong cuộc trò chuyện</h4>
                </div>
                <div class="modal-body">
                    <div class="all-images" style="visibility: hidden;">
                      
                    </div>
                </div>
            </div>
        </div>
    </div>`;

          $("body").append(imageModalData);

          // Buoc 6 call function gridPhoto
          gridPhotos(5);
          // Buoc 7 handel attachment modal
          let attachmentModalData = `
          <div class="modal fade" id="attachmentsModal_${data.newChatGroup._id}" role="dialog">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">Nhũng tệp đính kèm trong cuộc trò chuyện.</h4>
			</div>
			<div class="modal-body">
				<ul class="list-attachments">
					 
				</ul>
			</div>
		</div>
	</div>
        </div>
          
          `;
          $("body").append(attachmentModalData);

          //Buoc 8: Emit new Group created;

          socket.emit("new_group_created", { groupChat: data.newChatGroup });

          // buoc 10
          socket.emit('check-status')
        }).fail(function(res) {
          alertify.notify(res.responseText, "error", 7);
        });
      });
    });
}
$(document).ready(function() {
  $("#input-search-friends-to-add-group-chat").bind(
    "keypress",
    callSearchFriend
  );

  $("#btn-search-friends-to-add-group-chat").bind("click", callSearchFriend);

  callCreateChat();

  socket.on("res_new_group_created", function(res) {
    // buoc 1: hide modal

    // Buoc 2 handel leftSide.js
    let subGroupChatName = res.groupChat.name;
    if (subGroupChatName.length > 15) {
      subGroupChatName = subGroupChatName.substr(0, 14);
    } else {
    }
    let leftSideData = `
                  <a href="#uid_${res.groupChat._id}" class="room-chat" data-target="#to_${res.groupChat._id}">
                  <li class="person" data-chat="${res.groupChat._id}">
                      <div class="left-avatar">
                          <img src="images/users/group-avatar-trungquandev.png" alt="">
                      </div>
                      <div class="info-name">
                          <span class="name">
                          <span class="group-chat-name">
                          ${subGroupChatName} <span>...</span>
                           </span>
                           </span>
                                  <span class="preview convert-emoji">
                             
                          </span>

                      </div>
                      <span class="time">
                     
                          </span>
                  </li>
              </a>
      
      `;

    $("#all-chat")
      .find("ul")
      .prepend(leftSideData);
    $("#group-chat")
      .find("ul")
      .prepend(leftSideData);

    // step 3 hadel rightSide;
    let rightSideData = `
      <div class="right tab-pane" data-chat="${res.groupChat._id}"
      id="to_${res.groupChat._id}">
      <div class="top">
          <span>To: <span class="name">${res.groupChat.name}</span></span>
          <span class="chat-menu-right">
              <a href="#attachmentsModal_${res.groupChat._id}" class="show-attachments" data-toggle="modal">
                  Tệp đính kèm
                  <i class="fa fa-paperclip"></i>
              </a>
          </span>
          <span class="chat-menu-right">
              <a href="javascript:void(0)">&nbsp;</a>
          </span>
          <span class="chat-menu-right">
              <a href="#imagesModal_${res.groupChat._id}" class="show-images" data-toggle="modal">
                  Hình ảnh
                  <i class="fa fa-photo"></i>
              </a>
          </span>
          <span class="chat-menu-right">
              <a href="javascript:void(0)">&nbsp;</a>
          </span>
          <span class="chat-menu-right">
              <a href="javascript:void(0)" class="number-members" >
                  <span class="show-number-members">${res.groupChat.userAmount}</span>
                  <i class="fa fa-users"></i>
              </a>

          </span>
          <span class="chat-menu-right">
              <a href="javascript:void(0)">&nbsp;</a>
          </span>
          <span class="chat-menu-right">
              <a href="javascript:void(0)" class="number-messages" >
                  <span class="show-number-messages">${res.groupChat.messageAmount}</span>
                  <i class="fa fa-comment-o"></i>
              </a>

          </span>
      </div>
      <div class="content-chat">
          <div class="chat chat-in-group" data-chat="${res.groupChat._id}">
              

          </div>
      <div class="typing-chat" data-chat="${res.groupChat._id}"></div>

      </div>
              <div class="write" data-chat="${res.groupChat._id}">
                  <input type="text" class="write-chat chat-in-group" id="write-chat-${res.groupChat._id}"
                      data-chat="${res.groupChat._id}">
                  <div class="icons">
                      <a href="#" class="icon-chat" data-chat="${res.groupChat._id}"><i class="fa fa-smile-o"></i></a>
                      <label for="image-chat-${res.groupChat._id}">
                          <input type="file" id="image-chat-${res.groupChat._id}" name="my-image-chat" class="image-chat chat-in-group"
                              data-chat="${res.groupChat._id}">
                          <i class="fa fa-photo"></i>
                      </label>
                      <label for="attachment-chat-${res.groupChat._id}">
                          <input type="file" id="attachment-chat-${res.groupChat._id}" name="my-attachment-chat" class="attachment-chat chat-in-group"
                              data-chat="${res.groupChat._id}">
                          <i class="fa fa-paperclip"></i>
                      </label>
                      <a href="javascript:void(0)" id="video-chat-group">
                          <i class="fa fa-video-camera"></i>
                      </a>
                  </div>
              </div>
          </div>
      
      `;
    $("#screen-chat").prepend(rightSideData);

    // buoc 4: call changeScreen Chat
    changeSreenChat();

    // Buoc 5 hadel imagemodal
    let imageModalData = `<div class="modal fade" id="imagesModal_${res.groupChat._id}" role="dialog">
      <div class="modal-dialog modal-lg">
          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title">Những hình ảnh trong cuộc trò chuyện</h4>
              </div>
              <div class="modal-body">
                  <div class="all-images" style="visibility: hidden;">
                    
                  </div>
              </div>
          </div>
      </div>
  </div>`;

    $("body").append(imageModalData);

    // Buoc 6 call function gridPhoto
    gridPhotos(5);
    // Buoc 7 handel attachment modal
    let attachmentModalData = `
        <div class="modal fade" id="attachmentsModal_${res.groupChat._id}" role="dialog">
  <div class="modal-dialog modal-lg">
      <div class="modal-content">
          <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Nhũng tệp đính kèm trong cuộc trò chuyện.</h4>
          </div>
          <div class="modal-body">
              <ul class="list-attachments">
                   
              </ul>
          </div>
      </div>
  </div>
      </div>
        
        `;
    $("body").append(attachmentModalData);

    //Buoc 8: Emit new Group created;

    //Buoc 09:
    socket.emit('member_received_group_chat',{groupChatId:res.groupChat._id})

    //buoi 10: emit khi nember nhan groupchat
    socket.emit('check-status')
  });
});
