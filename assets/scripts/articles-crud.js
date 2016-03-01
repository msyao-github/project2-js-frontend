'use strict';
const apiAuth = require('./api-auth'); // to use for login baseUrl
const indexJs = require('./index')

$('#create-article').on('submit', indexJs.getArticles, function(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  $.ajax({
    url: apiAuth.myApp.baseUrl + '/articles',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + apiAuth.myApp.user.token,
    },
    processData: false,
    contentType: false,
    data:formData
  })
  .done(function(data){
    console.log(data);
  })
  .fail(function(jqxhr) {
    console.error(jqxhr);
  });
});

let articleId; //global variable
let getArticleId = function(e) {
  articleId = $(e.target).attr('data-id');
  console.log('Article ID is',articleId);
};

let editArticle = function (e) {
  e.preventDefault();
  console.log('Edit Button Works');
  $.ajax({
    url: apiAuth.myApp.baseUrl + '/articles/' + articleId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + apiAuth.myApp.user.token,
    },
    contentType: false,
    processData: false,
    data: new FormData(e.target)
  }).done(function(data) {
    console.log('Edit Article Works');
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};



// articles url only works with e.target
$('.content').on('click', '.delete-article', function(e) {
  e.preventDefault();
  alert('Are you sure you want to delete?');
  console.log('Delete Button Works');
  if (!apiAuth.myApp.user) {
    console.error('Wrong!');
    return;
  }
  $.ajax({
    url: apiAuth.myApp.baseUrl + '/articles/' + $(e.target).attr('data-id'),
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + apiAuth.myApp.user.token,
    },
  }).done(function(data) {
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
});

$(document).ready(() => {

});

module.exports = {
  editArticle,
  getArticleId,
};
