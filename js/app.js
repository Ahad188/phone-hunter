const loadPhone = async(searchText, dataLimit) => {
     const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
     const res = await fetch(url);
     const data = await res.json();
     showData(data.data, dataLimit)
}
   const showData = (data, dataLimit) => {
          // console.log(data)
          const phoneD = document.getElementById("phone-d");
          phoneD.textContent = '';
          // /slice data 

          // condtion data
          const shoall = document.getElementById("show-all");
          if(dataLimit && data.length > 10){
               data = data.slice(0, 10)
               shoall.classList.remove('d-none')
          }else{
               shoall.classList.add('d-none')
          }




          const warm = document.getElementById("warm");

          if( data.length === 0){
               warm.classList.remove('d-none');
          }else{
               warm.classList.add('d-none');
          }
          data.forEach(element => {
               const div = document.createElement("div");
               div.classList.add("col");
               div.innerHTML=`
               <div class="card">
                    <img src="${element.image}" class="card-img-top img-fluid w-50" alt="...">
                    <div class="card-body">
                         <h5 class="card-title"> ${element.phone_name}</h5>
                         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                         <button onclick="details('${element.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Ditals</button>
                         
                    </div>
               </div>
               
               `;
               phoneD.appendChild(div)
          });
          loadSpiner(false);
     };
     // proches serch
     const procheSearch = (dataLimit)=>{
          loadSpiner(true);
          const search =  document.getElementById("search");
          const searchText = search.value;
          loadPhone(searchText, dataLimit)
     }


// btn click
     document.getElementById('btn-se').addEventListener("click", () => {
          procheSearch(10);
     })
     // key enter
     document.getElementById('search').addEventListener('keyup', function (e) {
          // console.log(e.key)
          if (e.key === 'Enter') {
              procheSearch(10);
          }
      });

     // spiner function
     const loadSpiner = (isloder) => {
          const loder = document.getElementById('loder');
          if(isloder){
               loder.classList.remove('d-none')
          }else{
               loder.classList.add('d-none')
          }
     }

     // show all
     document.getElementById("btn-show-all").addEventListener('click',()=>{

           procheSearch();
     })

   const details = async(id) =>{
          const url = `https://openapi.programming-hero.com/api/phone/${id}`;
          const rest = await fetch (url);
          const dt = await rest.json();
           showModal(dt.data)
          // console.log(id,dt.data)
     }
          const showModal = (dt) => {
              const title = document.getElementById('staticBackdropLabel');
              title.innerText = dt.name;
              const body = document.getElementById('modal-body');
              body.innerHTML = `
                    <h5>ReleaseDate : ${dt.releaseDate ? dt.releaseDate : 'upcomming'}</h5>
                    <h6>Memory: ${dt.mainFeatures.memory}</h6>
                    <h6>Chipset : ${dt.mainFeatures.chipSet}</h6>
                    <h6>Display-Size : ${dt.mainFeatures.displaySize}</h6>
                    <h6>Sensor : ${dt.mainFeatures.sensors[0]}</h6>
                    
              `;
          }
 loadPhone("apple")