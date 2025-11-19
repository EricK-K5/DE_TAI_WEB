var form= document.getElementById('form');
var phoneInput= document.getElementById('phone'),
PasswordInput=document.getElementById('password'),
phone_error=document.getElementById('phone_error'),
password_error=document.getElementById('password_eror');
function ktmk()
{
    let check=true;
    if (PasswordInput.value.length<8)
    {
        password_error.textContent='❌';
        check=false;
    }
    else 
        password_error.textContent='✔';
    return check;
}
function ktsdt()
{
    let check=true;
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneInput.value.trim()))
    {
        phone_error.textContent='❌';
        check=false;
    }
    else 
       phone_error.textContent='✔';
    return check;
}
PasswordInput.addEventListener('input', ktmk);
phoneInput.addEventListener('input',ktsdt);
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if (!ktmk()||!ktsdt())
    {
        e.preventDefault();
        alert('Thông tin lỗi! vui lòng nhập lại thông tin')
    }
    else{
        const usersJSON = localStorage.getItem('users');
        const users = usersJSON ? JSON.parse(usersJSON) : [];
        var userExists = users.some(user => user.phone === phoneInput.value.trim());
        if (userExists) {
            alert("số điện thoại đã tồn tại");
            return;
        }
        userExists= users.some(user => user.user === document.getElementById('user').value.trim());
        if (userExists) {
            alert ('tên đăng nhập đã tồn tại');
            return;
        }


        const nhap={
            user: document.getElementById('user').value.trim(),
            phone:phoneInput.value,
            password:PasswordInput.value
        }
        users.push(nhap);
        localStorage.setItem('users', JSON.stringify(users));
        alert('✅ Đăng ký thành công! Đang chuyển đến trang Đăng nhập.');
        window.location.href = './dangnhap.html';

    }    
})