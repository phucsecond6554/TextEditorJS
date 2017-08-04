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
		var image = document.createElement("button");
		var getsave = document.createElement("button");

    //Dua cac element vao trang
    texteditor.appendChild(frame);
    texteditor.appendChild(area);
    texteditor.appendChild(bold);
    texteditor.appendChild(italic);
    texteditor.appendChild(html);
    texteditor.appendChild(tag);
    texteditor.appendChild(link);
		texteditor.appendChild(image);
		texteditor.appendChild(getsave);


		//Add CSS style cho frame editor
		var style = document.createElement("link");
		style.setAttribute("rel","stylesheet");
		style.setAttribute("href","style.css");
		frame.contentWindow.document.head.appendChild(style);

    //Frame chua text editor

    frame.setAttribute("id", "textframe");
    frame.style.width = "100%";
    frame.style.height = "300px";
    frame.contentWindow.document.designMode = "on";
		frame.contentWindow.document.close();

    //Text area chua html code
    area.setAttribute("id","htmlArea");
    //area.setAttribute("disabled","true");
		area.setAttribute("name", "text_content");
    area.style.width = "100%";
    area.style.height = "300px";
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

		//Image Button
		image.innerHTML = "Image";
		image.setAttribute("id","image_btn");

		//Get Save Button
		getsave.innerHTML = "Get Save";
		getsave.setAttribute("id","getsave_btn");

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

    var html_toggle = false; // Tuc la dang o trang thai visual(IFrame)
    html.onclick = function(){
        if(html_toggle == false){
            frame.style.display = "none";
            area.style.display = "block";
						var edit = frame.contentWindow.document;
		        area.value = edit.body.innerHTML;
            html_toggle = true;
        }else{
            frame.style.display = "block";
            area.style.display = "none";
						var edit = frame.contentWindow.document;
		        edit.body.innerHTML = area.value;
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
    }//Insert a link tag

		image.onclick = function(){
			let img_link = prompt("Image Link", "http://");
			let edit = frame.contentWindow.document;
			if(img_link !== null){
				let img_tag = "<img src="+img_link+">";
				edit.body.innerHTML += img_tag;
			}
		}

		getsave.onclick = function(){
			let edit = frame.contentWindow.document;

			if(html_toggle == false){
				edit.body.innerHTML = localStorage.getItem("autosave");
			}else {
				area.value = localStorage.getItem("autosave");
			}
		}

    /*setInterval(function(){
        var edit = frame.contentWindow.document;
        area.value = edit.body.innerHTML;
    },100);*/

		// Luu du lieu tu dong vao LocalStorage
		if(typeof(Storage) === "undefined"){
			alert("Xin loi trinh duyet cua ban khong ho tro luu tu dong");
		}

		function auto_save(){
			if(html_toggle === false){ // Dang o trang thai visual(IFrame)
				let edit = frame.contentWindow.document;
				if(edit.body.innerHTML != "" && edit.body.innerHTML != "<br>"){ // Neu khung nhap khac rong
					localStorage.setItem("autosave", edit.body.innerHTML);
				}
			}else{ // Neu dang o trang thai html
				if(area.value != "" && area.value != "<br>"){
					localStorage.setItem("autosave",area.value);
				}
			}
		}//Function auto_save


		setInterval(auto_save,5000); //Tu dong luu du lieu sau moi 5s
})();
