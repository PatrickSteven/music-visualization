function handleClick(){
    const Http = new XMLHttpRequest();
    const url='https://api.taketones.com/v1/public/tracks/search?type=genres&tag=pop';
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
    }
}
