<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Patient Dashboard</title>
        <link rel="stylesheet" href="css/index.css">
        <link rel="stylesheet" href="css/spinkit.css">
        <link rel="stylesheet" href="css/dashboard.css">
        <link rel="stylesheet" href="css/popup.css">
        <link rel="stylesheet" href="css/permissions.css">
        <link rel="stylesheet" href="css/stickylabels.css">
        <link rel="stylesheet" href="css/patient.css">
        <link rel="stylesheet" href="css/predictions.css">
        <link rel="stylesheet" href="css/report.css">

        <script type="importmap">
            {
                "imports": {
                "ReportTemplates": "js/ReportTemplates.js",
                "UtilFunctions" : "js/UtilFunctions.js",
                "PostFunctions" : "js/PostFunctions.js",
                "BlockchainContract" : "contracts/contract.connect.js",
                "ReportFunctions" : "js/ReportFunctions.js"
                }
            }
        </script>

        <script src="js/index.js" defer></script>
        <script src="js/patient.js" type="module"></script>
        <script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.5.141/build/pdf.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="js/web3/dist/web3.min.js"></script>
        <script src="js/interact.web3.js" type="module"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>
        <script src="js/predictions.ai.js" defer></script>

        <?php 
            echo "<script> 
            const PATIENT_NAME = '".$_SESSION['patient-username']."';
            const PATIENT_EMAIL = '".$_SESSION['patient-email']."';
            const PATIENT_ID = '".$_SESSION['patient-id']."';
            </script>"; 
        ?>
    </head>
    <body class="patient-page">

        <h1 class="main-heading">Reports on Blockchain</h1>

        <nav class="dashboard-menu select-none">
            <div class="menu-container">
                <div class="overflow-container">
                    <div class="metamask-address">{ address }</div>
                    <div class="username" onclick="dropdown()"><?php echo $_SESSION['patient-username']; ?></div>
                </div>
                <a class="logout" href="logout.php">logout</a>
            </div>
        </nav>

        <div class="split-pane">
            <div class="left-pane">
                <section> 
                    <div class="local-report-list select-none"></div>
                </section>

                <section>
                    <div class="metamask-container select-none">
                        <img class="bg-image place-absolute" src="images/metamask-icon.png" alt="">
                        
                        <div class="inner-grid">
                            <div class="metamask-button connect-wallet"></div> 
                            <span class="metamask-attribute detected-browser"></span>
                        </div>

                        <h1 class="total-heading"></h1>

                        <div class="outer-reports-container">
                        </div>
                    </div>
                </section>

                <section class="instructions">
                    <h1 class="heading">Instructions</h1>
                    <ol>
                        <li class="">Make sure you have metamask installed as an extension on your browser.</li>
                        <li class="">If you don't have metamask installed, you can install it from <a class="link" href="https://metamask.io/download/">https://metamask.io/download/</a></li>
                        <li class="">Connect to you wallet on this page, and accept the connection.</li>
                        <li class="">Verify the pdf from the doctor before saving it onto the blockchain.</li>
                        <li class="">You can disconnect from metamask manually using the wallet.</li>
                    </ol>
                </section>
            </div>
            <?php include 'components/price-side-widget.php'; ?>
        </div>

            <?php include 'components/overlays/add-to-blockchain-overlay.php'; ?>
            <?php include 'components/overlays/report-review-overlay.php'; ?>
            <?php include 'components/overlays/view-report-link-overlay.php'; ?>
            <?php include 'components/overlays/price-prediction-overlay.php'; ?>
    </body>
</html>