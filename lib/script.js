// Misael Guerrero
// Spring 2020
// Web233 Javascript
// Last Updated: 11/8/20
// LIST APP
// Version: 4

function getVersion() {
  document.write("4");
}

window.onload = function() {
  populateshoppinglistonload();
   displayShoppinglists();
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
  document.cookie = name + + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
  var ecost = prompt("Please enter new cost", ReplacedAmount);
  shoppinglist[position] = eitem + "," + '$' + ecost;
  displayShoppinglists();
  displayShoppingCart();
  savecookie();
}

function changeShoppingCart(position) {
  document.getElementById("MyCart").innerHTML = shoppinglist[position];
  var arrays = addtocart[position];
  arrays = arrays.split(",");
  var e1 = arrays[0];
  var e2 = arrays[1];
  var ReplacedAmount = e2.replace(/\$/g,'');
  var eitem = prompt("Please enter new item", e1);
  var ecost = prompt("Please enter new cost", ReplacedAmount);
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

function addtoshopcart(item, num) {
  deleteShoppinglists(num);
  addtocart.push(item);
  displayShoppinglists();
  displayShoppingCart(); 
  clearFocus();
  savecookie();
}

function addShoppinglist(item,cost) {
  var groc="";
  var count=0;
  MyItems.name=item;
  MyItems.price=cost;
  for (var x in MyItems){
    if (count===1){
      groc += "$";
    }
    groc += MyItems[x];
    if (count===0){
      groc += " | ";
    }
   count++;
  }
  shoppinglist.push(groc);
  displayShoppinglists();
  displayShoppingCart(); 
  clearFocus();
  savecookie();
}

function clearFocus()
{
  document.getElementById("item").value = "";
  document.getElementById("cost").value = "";
  document.getElementById("item").focus();
}

function displayShoppinglists() {
var TheList = "";
var TheRow = "";
var arrayLength = shoppinglist.length;
for (var i = 0; i < shoppinglist.length; i++) {

var btndelete =  ' <input class="button" id="remove" name="delete" type="button" value="Remove Item" onclick="deleteShoppinglists(' + i + ')" />';
var btnupdate =  ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeShoppinglist(' + i + ')" />';

var arrays = shoppinglist[i];
arrays = "'"+arrays+"'";
var btnaddcart =  '<label><input name="add" type="checkbox" id="adds" value="Add to Shopping Cart" onclick="addtoshopcart('+arrays+','+ i +')" />Add</label>';
TheRow = '<li>' + shoppinglist[i] + btndelete + ' '  + btnaddcart + '</li>';
TheList += TheRow;
}

if (arrayLength > 0)
{
  document.getElementById("MyList").innerHTML = '<ul>' + TheList + '</ul>';
}else
{
  document.getElementById("MyList").innerHTML = '';
}
}

function displayShoppingCart() {
var TheList = "";
var TheRow = "";
var arrayLength = addtocart.length;
for (var i = 0; i < arrayLength; i++) {
  var btndelete =  ' <input class="button" id="remove" name="delete" type="button" value="Remove Item" onclick="deleteShoppingCart(' + i + ')" />';
  var btnupdate =  ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeShoppingCart(' + i + ')" />';
  var arrays = addtocart[i];
  arrays = "'"+arrays+"'";
  var btnaddlist =  '<label><input name="add" type="checkbox" id="adds" value="Add to Shopping List" onclick="addbacktoshoppinglist('+arrays+',' + i + ')" checked="checked"/>Add</label>';
  TheRow =  "<li>" + addtocart[i] + btndelete + ' ' +  ' ' + btnaddlist + '<br></li>';
  TheList += TheRow;
}

if (arrayLength > 0) {
  document.getElementById("MyCart").innerHTML = 'Shopping Cart ' + '<br><ul>' + TheList + '</ul>';
}

else {
  document.getElementById("MyCart").innerHTML = '';
}
}

function deleteShoppinglists(position) {
  shoppinglist.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();
}

function deleteShoppingCart(position) {
  addtocart.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();
}












//BELOW ARE FUNCTIONS FROM THE PAST VERSIONS OF THIS WEB APP A.K.A. "THE GRAVEYARD"


//Discountinuing the release notes for now..
//function releaseNotes() {
//  var br = "<br>";
//  document.write("Release Notes: " + br);
//  document.write("Work In Progress. Testing new features.")
//}

/* //THIS FUNCTION IS TO EDIT THE LIST ON SCREEN
function editlist() {
  var itemtoedit = prompt("Which item would you like to edit? (1 - " + listlength + ")");
  validatenumberinput(itemtoedit);
  itemtoedit -= 1;
  list[itemtoedit] = prompt("Enter new list item.");
  validatetextinput(list[itemtoedit]);
  displayList();
}

//THIS FUNCTION LETS YOU DELETE SPECIFIC LIST ITEMS
function deleteitem() {
  var itemtodelete = prompt("Which item would you like to delete? (1 - " + listlength + ")");
  validatenumberinput(itemtodelete);
  itemtodelete -= 1;
  list.splice(itemtodelete, 1);
  displayList();
}

//THIS FUNCTION ASKS THE USER IF THEY WANT TO CHANGE OR DELETE A LIST ITEM
function listeditor() {
  var editORdelete = prompt("Would you like to edit or delete a list item? (e or d)");
  validatetextinput(editORdelete);
  editORdelete = editORdelete.toUpperCase();
  try {
    if ( typeof listlength === "undefined" || listlength === 0 ) {
      throw new Error("No list available to edit/delete. Please 'Add Item' to list.");
    }
    else if (editORdelete == "E" || editORdelete == "EDIT") {
      editlist();
    }
    else if (editORdelete == "D" || editORdelete == "DEL" || editORdelete == "DELETE") {
      deleteitem();
    }
    else {
      throw new Error("Invalid Input: '" + editORdelete +"'");
    }
  }
  catch(err) {
    alert(err);
  }
} */

//function getlistuse() {
  //var use = prompt("What is your list for?");
  //use = validatetextinput(use);
  //return use;
//}

//function getlistlength() {
  //var listlength = prompt("How many items do you want in your list?");
  //listlength = validatenumberinput(listlength);
  //return listlength;
//}

//function getlist(listlength) {
  //var list = [];
  //var i;
  //for (i = 0; i < listlength; i++) {
    //var item;
    //item = prompt("Please enter list item " + (i+1));
    //item = validatetextinput(item);
    //list.push(item);
  //}
  //return list;
//}

//function clearlist() {
  //document.getElementById("list").innerHTML = "List: Click 'Run ListMaker' to create a new list";
//}

//function addlistitem() {
  //var itemtoadd = prompt("Please enter item you would like to add to the list");
  //list.push(itemtoadd);
  //document.getElementById("list").innerHTML = "New List: " + list;
//}


//TODO: add a way to store multiple lists.

// OLD MAIN FUNCTION
//function listmaker() {
  //use = getlistuse();
  //listlength = getlistlength();
  //list = getlist(listlength);
  //document.getElementById("list").innerHTML = use + " List: " + list;  
//}

//RUNS AUTOMATICALLY EVERY TIME THE PAGE IS REFRESHED
//function runexample() {
  //list = ["eggs", "bacon", "spam"];
  //listlength = 3;
  //document.getElementById("list").innerHTML = "Example List: " + list;
//}