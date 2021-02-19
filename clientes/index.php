<?php
  if(!isset($_COOKIE["token"]) || ($_COOKIE["token"] == "")) {
    header('Location: /');
  }
?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <!-- Meta, title, CSS, favicons, etc. -->
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- <link rel="icon" href="/src/img/favicon.ico" type="image/ico" /> -->
  <title>Dashboard Administrador - Funtraining </title>
  <!-- Bootstrap -->
  <link href="/src/libs/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <!-- Font Awesome -->
  <link href="/src/libs/font-awesome/css/font-awesome.min.css" rel="stylesheet">
  <!-- Custom Theme Style -->

  <link rel="stylesheet" href="/src/css/schedule.css">
  <link rel="stylesheet" href="/src/css/datos-personales.css">

  <!-- Data tables -->

  <link href="../vendors/datatables.net-bs/css/dataTables.bootstrap.min.css" rel="stylesheet">
  <link href="../vendors/datatables.net-buttons-bs/css/buttons.bootstrap.min.css" rel="stylesheet">
  <link href="../vendors/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css" rel="stylesheet">
  <link href="../vendors/datatables.net-responsive-bs/css/responsive.bootstrap.min.css" rel="stylesheet">
  <link href="../vendors/datatables.net-scroller-bs/css/scroller.bootstrap.min.css" rel="stylesheet">
  <link href="/src/css/custom.css" rel="stylesheet">
  <link href="/src/css//clientes.css" rel="stylesheet">

</head>

<body class="nav-md">
  <div class="modal-container">
    <div id="btn-cerrar-popup">
      <svg style="width:48px;height:48px" viewBox="0 0 24 24">
        <path fill="#fff"
          d="M8.27,3L3,8.27V15.73L8.27,21H15.73L21,15.73V8.27L15.73,3M8.41,7L12,10.59L15.59,7L17,8.41L13.41,12L17,15.59L15.59,17L12,13.41L8.41,17L7,15.59L10.59,12L7,8.41" />
      </svg>
    </div>
    <div class="modal-fade" id="modal-editar">
      <div class="modal-body text-center">
        <p>titulo del campo</p>
        <input class="form-control" type="text" placeholder="">
        <p>titulo del campo</p>
        <input class="form-control" type="text" placeholder="">
        <p>titulo del campo</p>
        <input class="form-control" type="text" placeholder="">
        <p>titulo del campo</p>
        <input class="form-control" type="text" placeholder="">
        <div style="width: 100%; display: flex; flex-direction: row;justify-content: center;">
          <button class="btn btn-primary">Actualizar</button>
        </div>
      </div>
    </div>

    <div class="modal-fade" id="modal-agregar">
      <div class="modal-body text-center">
        <p>titulo del campo</p>
        <input class="form-control" type="text" placeholder="">
        <p>titulo del campo</p>
        <input class="form-control" type="text" placeholder="">
        <p>titulo del campo</p>
        <input class="form-control" type="text" placeholder="">
        <p>titulo del campo</p>
        <input class="form-control" type="text" placeholder="">
        <div style="width: 100%; display: flex; flex-direction: row;justify-content: center;">
          <button class="btn btn-success">Agregar</button>
        </div>
      </div>
    </div>

  </div>
  <div class="container body">
    <div class="main_container">
      <div class="col-md-3 left_col">
        <div class="left_col scroll-view">
          <div class="navbar nav_title" style="border: 0;">
            <a href="index.html" class="site_title"> <span>Funtraining</span></a>
          </div>
          <div class="clearfix"></div>
          <!-- menu profile quick info -->
          <div class="profile clearfix">
            <div class="profile_pic">
              <img src="/src/img/user.png" alt="..." class="img-circle profile_img">
            </div>
            <div class="profile_info">
              <h2>Administrador</h2>
            </div>
          </div>
          <!-- /menu profile quick info -->
          <br />
          <!-- sidebar menu -->
          <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
            <div class="menu_section">
              <h3>General</h3>
              <ul class="nav side-menu">
                <li><a href="/agenda/"> <i class="fa fa-calendar"></i>Agenda</a></li>
                <li><a href="/clientes/"> <i class="fa fa-list-alt"></i>Clientes</a></li>
              </ul>
            </div>
          </div>
          <!-- /sidebar menu -->
        </div>
      </div>
      <!-- top navigation -->
      <div class="top_nav">
        <div class="nav_menu">
          <div class="nav toggle">
            <a id="menu_toggle"><i class="fa fa-bars"></i></a>
          </div>
          <nav class="nav navbar-nav">
            <ul class=" navbar-right">
              <li class="nav-item dropdown open" style="padding-left: 15px;">
                <a href="javascript:;" class="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown"
                  data-toggle="dropdown" aria-expanded="false">
                  <img src="/src/img/user.png" alt="">Administrador
                </a>
                <div class="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#" id="btn-logout"><i class="fa fa-sign-out pull-right"></i>Cerrar
                    Sesión</a>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <!-- /top navigation -->
      <div class="right_col" role="main">
        <div class="container-fluid">
          <!-- page content -->

          <div class="row">
            <div class="col-md-12 col-sm-12 ">
              <div class="x_panel">
                <div class="x_title">
                  <h2>Clientes</h2>
                  <ul class="nav navbar-right panel_toolbox">
                    <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                    </li>
                  </ul>
                  <div class="clearfix"></div>
                </div>
                <div class="x_content">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="card-box table-responsive">
                        <table id="datatable" class="table table-striped table-bordered" style="width:100%">
                          <thead>
                            <tr>
                              <th># Identificación</th>
                              <th>Nombres</th>
                              <th>Correo</th>
                              <th>Número de celular</th>
                              <th colspan="2">Acción</th>
                            </tr>
                          </thead>


                          <tbody>
                            <tr>
                              <td>Tiger Nixon</td>
                              <td>System Architect</td>
                              <td>Edinburgh</td>
                              <td>61</td>
                              <td><button class="col-12 btn btn-primary btn-editar">editar</button></td>
                              <td><button class="col-12 btn btn-danger btn-eliminar">eliminar</button></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  
                    <button class="btn btn-success float-right" id="btn-agregar"> <i class="fa fa-plus"></i> Agregar</button>

                 
                </div>
              </div>
            </div>
          </div>

          <!-- /page content -->

        </div>
      </div>
    </div>
  </div>
  <!-- Custom Theme Scripts -->
  <!-- jQuery -->
  <script src="/src/libs/jquery/jquery.min.js"></script>
  <!-- Bootstrap -->
  <script src="/src/libs/bootstrap/js/bootstrap.bundle.min.js"></script>

  <!-- Bootstrap Core JavaScript -->
  <script src="/src/libs/bootstrap/js/bootstrap.min.js"></script>
  <!-- <?php include_once $_SERVER["DOCUMENT_ROOT"] . '/src/commons/common-scripts-caller.php';?> -->

  <script src="/src/libs/sweetalert2/sweetalert2.all.min.js"></script>
  <script src="/src/libs/axios/axios.min.js"></script>
  <script src="/src/js/utils.js"></script>
  <script src="/src/js/datos-personales.js"></script>
  <script src="/src/js/clientes.js"></script>

  <!-- Datatables -->
  <script src="../vendors/datatables.net/js/jquery.dataTables.min.js"></script>
  <script src="../vendors/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
  <script src="../vendors/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
  <script src="../vendors/datatables.net-buttons-bs/js/buttons.bootstrap.min.js"></script>
  <script src="../vendors/datatables.net-buttons/js/buttons.flash.min.js"></script>
  <script src="../vendors/datatables.net-buttons/js/buttons.html5.min.js"></script>
  <script src="../vendors/datatables.net-buttons/js/buttons.print.min.js"></script>
  <script src="../vendors/datatables.net-fixedheader/js/dataTables.fixedHeader.min.js"></script>
  <script src="../vendors/datatables.net-keytable/js/dataTables.keyTable.min.js"></script>
  <script src="../vendors/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
  <script src="../vendors/datatables.net-responsive-bs/js/responsive.bootstrap.js"></script>
  <script src="../vendors/datatables.net-scroller/js/dataTables.scroller.min.js"></script>
  <script src="../vendors/jszip/dist/jszip.min.js"></script>
  <script src="../vendors/pdfmake/build/pdfmake.min.js"></script>
  <script src="../vendors/pdfmake/build/vfs_fonts.js"></script>

  <!-- Custom js -->
  <script src="/src/js/custom.js"></script>
</body>

</html>