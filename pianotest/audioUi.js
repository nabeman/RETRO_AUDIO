function audioUI(idname, end){
    console.log(idname);
    activekey = document.getElementById(idname);
    end_pos = String(end) + '%';
    activekey.style.background = 'linear-gradient(to right, aqua 0% , aqua '+ end_pos +', white '+ end_pos +', white 100% )';
}