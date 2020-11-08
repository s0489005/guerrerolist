// Misael Guerrero
// Spring 2020
// Web233 Javascript
// Last Updated: 11/8/20
// LIST APP
// Version: 4.1

window.onload = function() {
 alert("Welcome to 'Shopping List' App")
 populateshoppinglistonload();
 displayShoppinglists();
 clearFocus();
};

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function remove_unwanted(str) {  
    
  if ((str===null) || (str===''))  
       return false;  
 else  
   str = str.toString();  
   str = str.replace(/%20/g, "");
   str = str.replace(/%24/g, "$"); 
   str = str.replace(/%7C/g, " | ");
  return str.replace(/[^\x20-\x7E]/g, '');  
}  

function savecookie()
{
  delete_cookie('guerrerolist');
   var date = new Date();
   date.setTime(date.getTime() + Number(365) * 3600 * 1000);
   document.cookie = 'guerrerolist' + "=" + escape(shoppinglist.join(',')) + "; path=/;expires = " + date.toGMTString();
}

function delete_cookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function populateshoppinglistonload()
{
  shoppinglist = [];
  addtocart = [];
  var y = readCookie('guerrerolist');
  y = remove_unwanted(y); 
  y = y.split('%2C');
  if (y) {
    shoppinglist = y;
   }
}

var MyItems = {
  name:"",
  price:""
};

var shoppinglist = [];
var addtocart = [];

function changeShoppinglist(position) {
  var arrays = shoppinglist[position];
  arrays = arrays.split(",");
  var e1 = arrays[0];
  var e2 = arrays[1];
  var ReplacedAmount = e2.replace(/\$/g,'');
  var eitem = prompt("Please enter new item", e1);
  var ecost = prompt("Please enter your name", ReplacedAmount);
  shoppinglist[position] = eitem + "," + '$' + ecost;
  displayShoppinglists();
  displayShoppingCart();
  savecookie();
}

//v3.1
function changeShoppingCart(position) {
  document.getElementById("MyCart").innerHTML = shoppinglist[position];
  var arrays = addtocart[position];
  arrays = arrays.split(",");
  var e1 = arrays[0];
  var e2 = arrays[1];
  var ReplacedAmount = e2.replace(/\$/g,'');
  var eitem = prompt("Please enter new item", e1);
  var ecost = prompt("Please enter your name", ReplacedAmount);
  addtocart[position] = eitem + "," + '$' + ecost;
  displayShoppinglists();
  displayShoppingCart();
  savecookie();
}

function addbacktoshoppinglist(item,num) {
  deleteShoppingCart(num);
  shoppinglist.push(item);
  displayShoppinglists();
  displayShoppingCart(); 
  clearFocus();
  savecookie();
}

//v 3.1 Update function addShoppinglist by adding objects
function addtoshopcart(item, num) {
  deleteShoppinglists(num);
  addtocart.push(item);
  displayShoppinglists();
  displayShoppingCart(); 
  clearFocus();
  savecookie();
}

function addShoppinglist(item) {
  if (item != "")
  {
  shoppinglist.push(item);
  displayShoppinglists(); 
  displayShoppingCart(); 
  clearFocus();

  savecookie();
  }else
  {
  alert("Item Description Required: Please enter now :)");
  clearFocus();
  }
}

function clearFocus()
{
  document.getElementById("item").value = "";
  document.getElementById("item").focus();
}

function displayShoppinglists() {
document.getElementById("MyList").innerHTML = '';
var TheList = "";
var TheRow = "";
var arrayLength = shoppinglist.length;
for (var i = 0; i < shoppinglist.length; i++) {

var btndelete =  ' <input class="button" id="remove" name="delete" type="button" value="Remove" onclick="deleteShoppinglists(' + i + ')" />';
var btnupdate =  ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeShoppinglist(' + i + ')" />';

var arrays = shoppinglist[i];
arrays = "'"+arrays+"'";
var btnaddcart =  '<input name="add" type="checkbox" id="adds" value="Add to Shopping Cart" onclick="addtoshopcart('+arrays+','+ i +')" />';
TheRow = '<li>' + shoppinglist[i] + btndelete + ' '  + btnaddcart + '</li>';
TheList += TheRow;
}

if (arrayLength > 0)
{
  document.getElementById("MyList").innerHTML = '<ul>' + TheList + '</ul>';
}else
{
  document.getElementById("MyList").innerHTML = ' ';
}
}

function displayShoppingCart() {
document.getElementById("MyCart").innerHTML = ''
var TheList = "";
var TheRow = "";
var arrayLength = addtocart.length;
for (var i = 0; i < arrayLength; i++) {

var btndelete =  ' <input class="button" id="remove" name="delete" type="button" value="Remove" onclick="deleteShoppingCart(' + i + ')" />';

var btnupdate =  ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeShoppingCart(' + i + ')" />';
var arrays = addtocart[i];
arrays = "'"+arrays+"'";

var btnaddlist =  '<input name="add" type="checkbox" id="adds" value="Add to Shopping List" onclick="addbacktoshoppinglist('+arrays+',' + i + ')" checked="checked"/>';
TheRow =  "<li>" + addtocart[i] + btndelete + ' ' +  ' ' + btnaddlist + '</li>';
TheList += TheRow;
}
if (arrayLength > 0) {
  document.getElementById("labels").innerHTML = 'Purchased';
  document.getElementById("MyCart").innerHTML = '<ul>' + TheList + '</ul>';
}
 else {
  document.getElementById("labels").innerHTML = '';
  document.getElementById("MyCart").innerHTML = '';
}
}

function deleteShoppinglists(position) {
  shoppinglist.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();
   //v 4.0 save cookie
  savecookie();
}

function deleteShoppingCart(position) {
  addtocart.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();
}
