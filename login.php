<!-- <?php
  session_start();
  if(isset($_SESSION['patient-username'])){ header('location:./'); }
?> -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="css/login.css">

    <script src="js/login.js"></script>

</head>
<body>

    <form class="login-container" method="POST" action="include/login.process.php">
        <h1>login</h1>
        <input type="text" name="username" required class="bordered background-dark username-field" placeholder="username">
        <input type="password" name="password" required class="bordered background-dark password-field" placeholder="password">
        <button class="button background-dark" onclick="PrepareForLogin()" type="submit" >login</button>
    </form>

</body>
</html>