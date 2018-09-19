<!DOCTYPE>
<html lang="en">
<head>
<meta name="language" content="en">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Tarun Test Weather App</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="./dist/css/app.min.css?v=0.0.1">
</head>
<body class="bg-light">
<div id="app" v-cloak>

  <header id="header" class="bg-white d-flex align-items-center">
    <div class="container">
      <div class="row">
        <div class="col-auto col-lg-4">
          <router-link to="/" class="brand">Tarun Test Weather App</router-link>
        </div>
        <div class="col col-lg-4">
          <form @submit.prevent="searchSubmit" class="search-form m-0">
            <input type="search" class="form-control" autocomplete="off" placeholder="Search..." v-model="search">
            <button type="submit"><i class="fa fa-search"></i></button>
          </form>
        </div>
      </div>
    </div>
  </header>

  <div class="container">
    <router-view></router-view>
  </div>

</div>

<script src="./dist/js/app.js"></script>

</body>
</html>