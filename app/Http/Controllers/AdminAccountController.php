<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AdminAccount;
use Hash;
use Illuminate\Support\Facades\Validator;

class AdminAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AdminAccount::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $valid = Validator::make($request->all(),
            [
                'admin_name'=>'required|min:3',
                'admin_email'=>'required|email',
                'admin_phone'=>'required|numeric|digits:10',
                'admin_password'=>'required|min:5|max:32',
                'grant'=>'required|min:1|max:5'
            ],
            [
                'admin_name.required'=>'Bạn chưa nhập tên người dùng',
                'admin_name.min'=>'Tên người dùng phải ít nhất 3 kí tự',
                'admin_email.required'=>'Bạn chưa nhập email',
                'admin_email.email'=>'Email chưa đúng định dạng',
                'admin_phone.required'=>'Bạn chưa nhập số điện thoại',
                'admin_phone.numeric'=>'Số điện thoại phải là số',
                'admin_phone.digits'=>'Số điện thoại phải đủ 10 chữ số',
                'admin_password.required'=>'Bạn chưa nhập mật khẩu',
                'admin_password.min'=>'Mật khẩu phải ít nhất 5 kí tự',
                'admin_password.max'=>'Mật khẩu chỉ tối đa 32 kí tự',
                'grant.required'=>'Phải phân quyền tài khoản',
                'grant.min'=>'Mật khẩu chỉ tối thiểu 1 kí tự',
                'grant.max'=>'Mật khẩu chỉ tối đa 5 kí tự',
            ]
        );
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                // echo($value[0]);
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }
        $request->offsetSet('admin_password',bcrypt($request->input('admin_password')));
        return AdminAccount::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $admin = AdminAccount::findOrFail($id);
        return $admin;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $valid = Validator::make($request->all(),
            [
                'admin_name'=>'required|min:3',
                'admin_phone'=>'required|numeric|digits:10',
            ],
            [
                'admin_name.required'=>'Bạn chưa nhập tên người dùng',
                'admin_name.min'=>'Tên người dùng phải ít nhất 3 kí tự',
                'admin_phone.required'=>'Bạn chưa nhập số điện thoại',
                'admin_phone.numeric'=>'Số điện thoại phải là số',
                'admin_phone.digits'=>'Số điện thoại phải đủ 10 chữ số',
            ]
        );
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                // echo($value[0]);
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }

        $find = AdminAccount::where('admin_email',$request->admin_email)->get();
        // var_dump($find);
        if($request->isChanged){
            $valid = Validator::make($request->all(),
                [
                    'admin_password'=>'required|min:5|max:32'
                ],
                [
                    'admin_password.required'=>'Bạn chưa nhập mật khẩu',
                    'admin_password.min'=>'Mật khẩu phải ít nhất 5 kí tự',
                    'admin_password.max'=>'Mật khẩu chỉ tối đa 32 kí tự'
                ]
            );
            if($valid->fails()){
                $err = [];
                foreach($valid->errors()->messages() as $key => $value){
                    // echo($value[0]);
                    $err[] = $value[0];
                }
                return response()->json($err, 400);
            }
            if (count($find)) {
                if (Hash::check($request->admin_old_pass, $find[0]->admin_password)) {
                    $request->offsetSet('admin_password',bcrypt($request->input('admin_password'))); 

                    $admin = AdminAccount::findOrFail($id);
                    // return $request->all();
                    $admin->update($request->all());
                    return response()->json('Cập nhật mật khẩu thành công', 200);
                }
            }
            // var_dump($request->admin_password);
            return response()->json('Sai mật khẩu cũ', 400);
        }
        else{
            $admin = AdminAccount::findOrFail($id);
            $admin->update($request->all());
            return response()->json('Cập nhật thành công', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $admin = AdminAccount::findOrFail($id);
        $admin->delete();
        return 204;
    }

    public function login(Request $request)
    {
        $valid = Validator::make($request->all(),
            [
                'admin_email'=>'required|email',
                'admin_password'=>'required|min:5|max:32'
            ],
            [
                'admin_email.required'=>'Bạn chưa nhập email',
                'admin_email.email'=>'Email chưa đúng định dạng',
                'admin_password.required'=>'Bạn chưa nhập mật khẩu',
                'admin_password.min'=>'Mật khẩu phải ít nhất 5 kí tự',
                'admin_password.max'=>'Mật khẩu chỉ tối đa 32 kí tự'
            ]
        );
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }
        // $inputPassword = bcrypt($request->input('admin_password'));
        // var_dump($inputPassword);
        $find = AdminAccount::where('admin_email', '=', $request->admin_email)->get();
        if(count($find)) {
            if (Hash::check($request->admin_password, $find[0]->admin_password)) {
                return $find;
            }
            else {
                return response()->json('Sai thông tin login',500);
            }
        }
        else {
            return response()->json('Sai thông tin login',500);
        }    
    }
    //lela@student.stu.edu.vn_____pass: Abcd654321
    //hung.tranquoc@gmail.com_____pass: Abc12345
}
