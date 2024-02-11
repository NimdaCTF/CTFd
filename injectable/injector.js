function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}

let task = get('task')
if (task === undefined){
   alert('Empty task name')
}
else {
    let reg = new RegExp('$\\s+?\'userId\': (\\d+)', 'gm');
   fetch('/user').then(x =>
      x.text().then(t => {
         let result = reg.exec(t);
         if (!result){
            alert('You\'re unauthorized or something wrong')
            return undefined;
         }
         window.location.replace('/ctfdockyard/' + task + '?user_id=' + result[1]);
      }
      ).catch(ex => alert(ex))
   )
}