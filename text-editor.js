(function(){
    /*
        * Khoi tao cac Element can thiet
    */
	var texteditor = document.getElementById("text-editor"); // Div ben ngoai text editor
	var frame = document.createElement("iframe"); // Frame chua texteditor
    var area = document.createElement("textarea"); // Textarea chua ma html
    var bold = document.createElement("button"); // Nut in dam
    var italic = document.createElement("button"); // nut in nghieng
    var html = document.createElement("button"); // Nut hien html code
    var tag = document.createElement("button");
    var link = document.createElement("button");
    
    //Dua cac element vao trang
    texteditor.appendChild(frame);
    texteditor.appendChild(area);
    texteditor.appendChild(bold);
    texteditor.appendChild(italic);
    texteditor.appendChild(html);
    texteditor.appendChild(tag);
    texteditor.appendChild(link);
    
    //Frame chua text editor
    
    frame.setAttribute("id", "textframe");
    frame.style.width = "100%";
    frame.style.height = "200px";
    frame.contentWindow.document.designMode = "on";
    
    //Text area chua html code
    area.setAttribute("id","htmlArea");
    area.setAttribute("disabled","true");
    area.style.width = "100%";
    area.style.height = "200px";
    area.style.display = "none";
    
    //Button Bold
    bold.innerHTML = "Bold";
    bold.setAttribute("id", "bold_btn");
    
    // Italic button
    italic.innerHTML = "Italic";
    italic.setAttribute("id","italic_btn");
    
    //Text Button
    html.innerHTML = "HTML";
    html.setAttribute("id","text_btn");
    
    //Tag Button
    tag.innerHTML = "Tag";
    tag.setAttribute("id", "tag_btn");
    
    //Link button
    link.innerHTML = "Link";
    link.setAttribute("id","link_btn");
    
    bold.onclick = function(){
        let edit = frame.contentWindow;
        edit.focus();
        edit.document.execCommand("bold","false","");
        edit.focus();
    } // Khi nhan nut bold se in dam van ban
    
    italic.onclick = function(){
        let edit = frame.contentWindow;
        edit.focus();
        edit.document.execCommand("italic","false","");
        edit.focus();
    } // KHi nhan vao nut Italic se in nghieng van ban
    
    var html_toggle = false;
    html.onclick = function(){
        if(html_toggle == false){
            frame.style.display = "none";
            area.style.display = "block";
            html_toggle = true;
        }else{
            frame.style.display = "block";
            area.style.display = "none";
            html_toggle = false;
        }
    } // Chuyen doi text <-> html 
    
    tag.onclick = function(){
        let tag_content = prompt("Nhap tag ban muon","Example: <h1>this is h1 </h1>");
        let edit = frame.contentWindow.document;
        if(tag_content !== null)
            edit.body.innerHTML += tag_content;
    }
    
    link.onclick = function(){
        let link_site = prompt("Nhap link","http://");
        let edit = frame.contentWindow.document;
        if(link_site !== null){
            let a_tag = "<a href="+link_site+">"+link_site+"</a>";
            edit.body.innerHTML += a_tag;
        }
            
    }
    
    setInterval(function(){
        var edit = frame.contentWindow.document;
        area.value = edit.body.innerHTML;
    },100);
})();