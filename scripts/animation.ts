const hiddenDivs = document.getElementsByClassName('hidden-div') as HTMLCollectionOf<HTMLElement>;
  


Array.from(hiddenDivs).forEach((div: Element) => {
    div.addEventListener('mouseover', () => {
        setTimeout(() => {
            div.classList.remove('delay-200');
            console.log(1)
        }, 500); 
      });
    
      div.addEventListener('mouseleave', () => {
        div.classList.remove('delay-500');
        console.log(2)
    });
  });

  



