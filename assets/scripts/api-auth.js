'use strict';

//const below lets you edit the home url in one place instead of inside each form. You can use as part of a path to change values
//This script works with index.html
const myApp = {
  baseUrl: 'https://pacific-tor-92467.herokuapp.com/',
};

$(document).ready(() => {
  $('.change-password-nav').hide();
  $('.create-tab').hide();
  $('.sign-out-nav').hide();
  $('.alert-success').hide();

//show user email on navbar
let showUser = function (){
  $( '.user-email-login' ).html(myApp.user.email);
};

let hideModal = function (){
  $('#sign-in-modal').modal('hide');
  $('#change-password-modal').modal('hide');
  $('#sign-up-modal').modal('hide');
};

//Create new user from form id="sign-up"
$('#sign-up').on('submit', function(e) {
  e.preventDefault();
  hideModal();
  var formData = new FormData(e.target);
  $.ajax({
    url: myApp.baseUrl + '/sign-up',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
});

//Signs in registered user
  $('#sign-in').on('submit', function(e) {
    e.preventDefault();
    hideModal();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/sign-in',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      myApp.user = data.user;
      console.log(data);
      showUser();
      $('.change-password-nav').show();
      $('.create-tab').show();
      $('.sign-in-nav').hide();
      $('.sign-out-nav').show();
      $('.sign-up-nav').hide();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  //Change password of currently logged-in user
  $('#change-password').on('submit', function(e) {
    e.preventDefault();
    hideModal();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/change-password/' + myApp.user.id,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });



  //Log out
  $('#sign-out-button').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      url: myApp.baseUrl + '/sign-out/' + myApp.user.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
    }).done(function() {
      console.log("User Logged Out");
      $('.change-password-nav').hide();
      $('.sign-in-nav').show();
      $('.sign-out-nav').hide();
      $('.sign-up-nav').show();
      $( '.user-email-login' ).hide();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });
});





module.exports = {
  myApp,
};
