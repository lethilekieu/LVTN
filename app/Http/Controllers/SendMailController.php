<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use Aman\EmailVerifier\EmailChecker;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;

class SendMailController extends Controller
{
    public function checkExistMail(Request $request){
        // $validator = Validator::make( $request->all(),[
        //     'email'=>'required|min:3',
        //     'tenKH'=>'required'
        // ],[
        //     'email.required'=>'thiếu chữ',
        //     'email.min' => 'ít nhất 3 chữ',
        //     'tenKH.required'=>'thiếu tên'
        // ]);
        
        // if($validator->fails()){
        //     $err=[];
        //     foreach ($validator->errors()->messages() as $key => $value) {
        //         $err[]=$value[0];
        //     }
        //     var_dump($err);
        // }
        // return;

        $real = app(EmailChecker::class)->checkEmail($request->email);
        return $real["success"]? 'true' : 'false';
    }
    public function sendMail(Request $request)
    {
        // Load Composer's autoloader
        // require 'vendor/autoload.php';

        // Instantiation and passing `true` enables exceptions
        $mail = new PHPMailer(true);

        try {
            $mail->SMTPDebug = 1;                     
            $mail->isSMTP();                                           
            $mail->Host       = 'smtp.gmail.com';                    
            $mail->SMTPAuth   = true;                                   
            $mail->Username   = 'testshop.4509@gmail.com';                    
            $mail->Password   = "Abcd654321";                              
            $mail->SMTPSecure = 'tls';    
            $mail->Port       = 587; 

            $mail->setFrom('testshop.4509@gmail.com', 'Shop quần áo');
            $mail->addAddress($request->ship_email, 'Dear my:' . $request->customer_id);

            $mail->AddEmbeddedImage('images/ImageCrs/logo.jpg', 'kvshop');
            $textBody='
                <head>
                    <meta charset="UTF-8" />
                </head>
                <body style="font-family: Arial, Helvetica, sans-serif; color: black">
                    <table style="margin: 0 auto;">
                        <tr>
                            <td width="320">
                                <img
                                height="42"
                                alt="KVshop"
                                border="0"
                                style="border: none; padding: 0; margin: 0;"
                                src="cid:kvshop"
                                />
                            </td>
                            <td>
                                <h1 style="margin-top: 20px; text-align:right">Biên Nhận</h3>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"><hr></td>
                        </tr>
                        <tr>
                            <td>
                                Email: '. $request->ship_email .'
                            </td>
                            <td>
                                Order_id: '. $request->order_id .'
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Phone: '. $request->ship_phone .'
                            </td>
                            <td>
                                User_name: '. $request->customer_id .'
                            </td>
                        </tr>'.
                        // <tr>
                        //     <td>
                        //         Bank: '. (($request->loaiThe==0) ? 'VISA' : (($request->loaiThe==1) ? 'MasterCard' : (($request->loaiThe==2) ? 'Domestic' : ''))) .'_'. (($request->nganHang==0) ? 'BIDV' : (($request->nganHang==1) ? 'Eximbank' : '')) .'
                        //     </td>
                        //     <td>
                        //         Created_at: '. $request->created_at .'
                        //     </td>
                        // </tr>
                        '<tr>
                            <td colspan="2"><hr></td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center; padding-top: 20px">
                                <i>Date Order: '. $request->created_at .'</i>
                                <h3>
                                    Total Price: <span>'. $request->total_sold .' VND</span>
                                </h3> 
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <img
                                    width="24"
                                    height="24"
                                    alt="shop"
                                    border="0"
                                    style="border: none; padding: 0; margin: 0;"
                                    src="cid:kvshop"
                                />
                                <br>
                                <a href="http://127.0.0.1:8000" target="_blank">
                                    Go to Website KVshop
                                </a>
                            </td>
                        </tr>
                    </table>
                </body>
            ';

            $mail->isHTML(true);  
            $mail->CharSet = "UTF-8";                
            $mail->Subject = 'Biên nhận của bạn từ KVshop';
            $mail->Body    = $textBody;

            $mail->send();
            return 'true';
        } catch (Exception $e) {
            // return "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            return 'false';
        }
    }
}