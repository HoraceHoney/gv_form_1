//user verification using mysql
//This is only intermediate between profile.html and profile.php

function do_login()
{
 var email=$("#email").val();
 var pass=$("#psw").val();
 if(email!="" && pass!="")
 {

  $.ajax
  ({
  type:'post',
  url:'login.php',
  data:{
   do_login:"do_login",
   email:email,
   password:pass
  },
  success:function(response) {
  if(response=="success")
  {
    window.location.href="index.php";
  }
  else
  {

    alert("Wrong Details");
  }
  }
  });
 }

 else
 {
  alert("Please Fill All The Details");
 }

 return false;
}
