var form= document.getElementById('form');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    var user=document.getElementById('user').value.trim();
    var password=document.getElementById('password').value.trim();
    const usersJSON = localStorage.getItem('users');
    const users = usersJSON ? JSON.parse(usersJSON) : [];
    var check=0;
    for (let i=0;i<users.length;i++)
    {
        if (users[i].user===user&& users[i].password===password)
            check=1;
    }
    if (check===1) 
    {
        window.location.href='./trangchu.html';
    }
    else
        alert('Tên tài khoản hoặc mật khẩu không đúng')
})
