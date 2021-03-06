function dispose() {
    Height = document.getElementById("Pagina").offsetHeight;
    header = document.getElementById("Header").offsetHeight;
    footer = document.getElementById("Pie").offsetHeight;
    panelheight = Height - header - footer;
    document.getElementById('Contenido').style.height = panelheight + "px"
}


function replace_list(data, list){
  var keys = [];
  for (var key in list) {
    var re = new RegExp("%"+key, "g");
    data = data.replace(re,list[key])
  }
  return data
}

function play(url,title){
  window.open(url);
}


function vlc_play(url,title){
  html_code = replace_list(html.vlc_player, {"video_url": url})
  dialog.player(title,html_code)
}

function html_play(url,title){
  html_code = replace_list(html.html_player, {"video_url": url})
  dialog.player(title,html_code)
}

function set_category(category){
  if (category){
  document.getElementById("titulo").innerHTML = "pelisalacarta / " + category;
  document.title = "pelisalacarta / " + category
  } else {
  document.getElementById("titulo").innerHTML = "pelisalacarta";
  document.title = "pelisalacarta"
  }
}

function image_error(thumbnail){
  if (thumbnail.src.indexOf("http") == 0){
    if (thumbnail.src.indexOf(thumbnail.alt) !== 0){
      thumbnail.src=thumbnail.alt+"/proxy/"+encodeURIComponent(btoa(thumbnail.src))
    }else{
      thumbnail.style.display="none";
      try{ 
        thumbnail.parentNode.children[1].style.display="inline-block"
      }catch(e){}
    }
  }else {
    image_local(thumbnail)
  }
}

function image_local(thumbnail){
  if (thumbnail.src.indexOf(thumbnail.alt) !== 0){
    thumbnail.src=thumbnail.alt+"/local/"+encodeURIComponent(btoa(thumbnail.src))
  }else{thumbnail.style.display="none"}
}

function load_info(item, viewmode) {

    thumbnail = item.getElementsByTagName("img")[0]
    title = item.getElementsByTagName("h3")[0]
    plot = item.getElementsByTagName("p")[0]
    
    document.getElementById("Info-Img").src = thumbnail.src
    document.getElementById("Info-Plot").innerHTML = plot.innerHTML.replace(/\n/g,"<br>")
    document.getElementById("Info-Title").innerHTML   = title.innerHTML
    
    if (viewmode == "list"){
      document.getElementById("Info-Img").style.display="block"
      document.getElementById("Info-Plot").style.display="none"
      document.getElementById("Info-Title").style.display="none"
      document.getElementById("InfoVersion").style.display="none"
      
    }else if (viewmode == "banner" || viewmode == "channel"){  
      document.getElementById("Info-Img").style.display="none"
      document.getElementById("Info-Plot").style.display="none"
      document.getElementById("Info-Title").style.display="none"
      document.getElementById("InfoVersion").style.display="block"
      
    }else {
      document.getElementById("Info-Img").style.display="block"
      document.getElementById("Info-Plot").style.display="block"
      document.getElementById("Info-Title").style.display="block"
      document.getElementById("InfoVersion").style.display="none"
    }

    
    auto_scroll(document.getElementById('Info-Plot'))
}

function unload_info(obj) {
    document.getElementById("InfoVersion").style.display="block"
    document.getElementById("Info-Img").style.display="none"
    document.getElementById("Info-Plot").style.display="none"
    document.getElementById("Info-Title").style.display="none"
    document.getElementById("Info-Plot").innerHTML = ""
    document.getElementById("Info-Title").innerHTML = ""
}

function change_category(category) {
    document.getElementById("Config").scrollTop = 0;
    categories = document.getElementById("Config").getElementsByTagName("ul")
    for (var x in categories) {
        if (categories[x].id == "Config-" + category) {
            categories[x].style.display ="block";
        } else if (categories[x].style){
             categories[x].style.display ="none";
        }
    }
}

function auto_scroll(element){
  clearInterval(element.interval)
  element.scrollLeft = 0;
  element.scrollTop = 0;
  
  if (element.scrollWidth > element.offsetWidth){
    initialscrollWidth = element.scrollWidth
    element.innerHTML = element.innerHTML + " | " + element.innerHTML
    element.interval = setInterval(function() {
        element.scrollLeft += 1;
        if (element.scrollLeft -1>= element.scrollWidth - initialscrollWidth){element.scrollLeft = 0;}
      }, 80);
  }
  if (element.scrollHeight > element.offsetHeight){
    initialscrollHeight = element.scrollHeight
    element.innerHTML = element.innerHTML + "</br>" + element.innerHTML
    element.interval = setInterval(function() {
        element.scrollTop += 1;
        if (element.scrollTop >= element.scrollHeight - initialscrollHeight){element.scrollTop = 0;}
      }, 80);
  }
}