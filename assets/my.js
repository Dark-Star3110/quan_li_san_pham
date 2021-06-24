let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
// alert(x + ' × ' + y);
document.getElementById('submit-edit-product').style.width=x*0.35+'px';
document.getElementById('box-add-product').style.width=x*0.35+'px';
document.getElementById('slider').style.width=x*0.39+'px';
document.getElementById('submit-edit-product').style.height=y*0.12+'px';
document.getElementById('box-add-product').style.height=y*0.12+'px';
// document.getElementById('slider').style.height=y*0.12+'px';


window.onload = function(){
    setTimeout("switch_img()",4000);
}
let i=1;
let number=3;
function switch_img(){
    i++;
    document.images['slide'].src="./assets/img/slide"+i+".jpg";
    if(i<number){
        setTimeout("switch_img()",4000);
    }
    else if(i==number){
        i=0;
        setTimeout("switch_img()",4000);
    }
}

// ====================================
let product_array=[
    ["ip12","Iphone 12 Pro Max 128GB",29400000,2],
    ['xiaomi',"Xiaomi POCO X3 Pro 8GB",7129000,18],
    ['ss','SamSung Galaxy Note20 Utra',21990000,4]
];
let product_available=[
    ["nokia5.4",'Nokia 5.4 4GB -128GB',2990000,25],
    ["oppoA73",'OPPO A73 6GB-128GB',4990000,14],
    ['realme30A','Realme Narzo 30A 4GB - 64GB',3790000,20],
    ['samsungs21','Samsung Galaxy S21+ 128GB',20990000,8],
    ['vivoY20','Vivo Y20 4GB - 64GB',3290000,16],
    ['VmartJoy','Vsmart Joy 4 3GB-64GB',2690000,24]
];
let visited=[];
let color=[];
for(let i=0;i<product_available.length;i++){
    visited[i]='Select';
    color[i]='green';
}

// function swap(arr1,arr2){
//     let temp=[];
//     temp=arr1;
//     arr1=arr2;
//     arr2=temp;
//     // console.log(arr1);
//     // console.log(arr2);
// }

function sort_product(){
    let n=product_array.length;

    for(let i=0;i<n-1;i++){
        // console.log(product_array[i][2]);
        for(let j=i+1;j<n;j++){
        // console.log(product_array[j][2]);
            if(product_array[i][2] > product_array[j][2]){
                // swap(product_array[i],product_array[j]);
                let temp=[];
                temp=product_array[i];
                product_array[i]=product_array[j];
                product_array[j]=temp;
            }
        }
    }
}

function display_product(){
    // document.getElementById('table-list-available-product').style.display='none';
    sort_product();
    let html="";
    for(let i=0;i<product_array.length;i++){
        html+="<tr>";
        for(let j=0;j<product_array[0].length;j++){
            if(j==0){
                html+='<th>';
                html+='<img src='+'"./assets/img/'+product_array[i][0]+'.jpg"'+ 'alt="Product Image" class="product-img"></img>';
                html+='</th>';
            }
            else if(j==2){
                html+='<th style="padding:10px;">';
                html+=product_array[i][j]+'VND';
                html+='</th>';
            }
            else{
                html+='<th style="padding:10px;">';
                html+=product_array[i][j];
                html+='</th>';
            }
        }
        html+='<td class="sub-btn" ><button id="edit-btn'+i+'" onclick="editProduct('+i+')">Edit</button></td>';
        html += '<td class="sub-btn"><button id="delete-btn'+i+'" onclick="deleteProduct('+i+')">Delete</button></td>'
        // html+='<td><input type="checkbox" value="0" id="checkbox1" /></td>';
        html += '<td><input type="checkbox" class="ck-box" id="check-box'+i+'" onclick="check('+i+')"/></td>'
        html+="</tr>";
    }
    document.getElementById("product-list").innerHTML=html;
}
display_product();

function check(index){
    let check = document.getElementById('check-box'+index).checked;
    let edit_btn=document.getElementById('edit-btn'+index);
    let delete_btn=document.getElementById('delete-btn'+index);
    if(check){
        edit_btn.disabled=true;
        edit_btn.style.cursor='not-allowed';
        edit_btn.style.opacity=0.6;
        delete_btn.disabled=true;
        delete_btn.style.cursor='not-allowed';
        delete_btn.style.opacity=0.6;
    }
    else{
        edit_btn.disabled=false;
        edit_btn.style.cursor='pointer';
        edit_btn.style.opacity=1;
        delete_btn.disabled=false;
        delete_btn.style.cursor='pointer';
        delete_btn.style.opacity=1;
    }
}

function search_product(){
    check=false;
    let product=document.getElementById('search-product').value;
    for(let i=0;i<product_array.length;i++){
        if(product==product_array[i][1]){
            html2='';
            document.getElementById('main').style.display='none';
            for(let j=0;j<product_array[0].length;j++){
                if(j==0){
                    html2+='<img src='+'"./assets/img/'+product_array[i][0]+'.jpg"'+ 'alt="Product Image" class="product-img"></img>';
                    html2+='<br>';
                }
                else{
                    html2+=product_array[i][j];
                    html2+='<br>';
                }
            }
            html2+='<button onclick="close_box()">Close</button>';
            document.getElementById('box').innerHTML=html2;
            document.getElementById('box').style.display='block';
            check=true;
        }
    }
    if(!check){
        alert('not found !!!');
    }
}

function close_box(){
    document.getElementById('main').style.display='block';
    document.getElementById('box').style.display='none';
    document.getElementById('search-product').value='';
}

function add_product() {
    let img = document.getElementById('image').value;
    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let quantity = document.getElementById('quantity').value;
    if(img == '' || name == '' || price == '' || quantity == ''){
        alert('Please complete all information !!!');
        return;
    }
    let product = [img,name, price, quantity];
    product_array.push(product);

    display_product();
    clearInput();

}

function clearInput() {
    document.getElementById('image').value='';
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
}

function display_available_product(){
    document.getElementById('table-list-product').style.display='none';
    document.getElementById('table-list-available-product').style.display='block';
    let html="";
    for(let i=0;i<product_available.length;i++){
        html+="<tr>";
        for(let j=0;j<product_available[0].length;j++){
            if(j==0){
                html+='<th>';
                html+='<img src='+'"./assets/img/'+product_available[i][0]+'.jpg"'+ 'alt="Product Image" class="product-img"></img>';
                html+='</th>';
            }
            else{
                html+='<th style="padding:10px;">';
                html+=product_available[i][j];
                html+='</th>';
            }
        }
        html+='<td class="sub-btn"><button id="select-btn'+i+'" style="background-color:'+color[i]+';" onclick="select_product('+i+')">'+visited[i]+'</button></td>';
        html+="</tr>";
    }
    document.getElementById("available-product-list").innerHTML=html;
    document.getElementById('available-product-footer-top').innerHTML='<tr><button onclick="add_all()">Select All</button></tr>';
    document.getElementById('available-product-footer-bot').innerHTML='<tr><button style="background-color:red;" onclick="close_sub_content()">Close</button></tr>';
}

function close_sub_content(){
    document.getElementById('table-list-product').style.display='block';
    document.getElementById('table-list-available-product').style.display='none';
}

function select_product(i){
    document.getElementById('table-list-product').style.display='block';
    document.getElementById('table-list-available-product').style.display='none';
    document.getElementById('image').value= product_available[i][0];
    document.getElementById('name').value = product_available[i][1];
    document.getElementById('price').value = product_available[i][2];
    document.getElementById('quantity').value = product_available[i][3];
    color[i]='#cd1817';
    visited[i]='Selected';
}


function deleteProduct(index){
    if(confirm("Are you sure?")){
        product_array.splice(index,1);
        display_product();
    }
}

function add_all(){
    product_array=product_array.concat(product_available);
    document.getElementById('table-list-product').style.display='block';
    document.getElementById('table-list-available-product').style.display='none';
    display_product();
    clearInput();
}

function editProduct(index){
    let productEdit = product_array[index];
    document.getElementById('image').value = productEdit[0];
    document.getElementById('name').value = productEdit[1];
    document.getElementById('price').value = productEdit[2];
    document.getElementById('quantity').value = productEdit[3];

    document.getElementById('submit-add-product').hidden = true;
    document.getElementById('view-product').hidden = true;
    document.getElementById('submit-edit-product').hidden=false;
    document.getElementById('submit-edit-product').innerHTML = '<button onclick="updateProduct('+index+')" >Update</button>';
}

function updateProduct(index){
    let product_edit=[];
    product_edit[0] = document.getElementById('image').value;
    product_edit[1]=document.getElementById('name').value;
    product_edit[2]=document.getElementById('price').value;
    product_edit[3]=document.getElementById('quantity').value;
    // for(let i=0;i<product_array[0].length;i++){
    //     product_array[index][i]=product_edit[i];
    // } 
    product_array[index]=product_edit;
    document.getElementById('submit-add-product').hidden = false;
    document.getElementById('view-product').hidden = false;
    document.getElementById('submit-edit-product').hidden=true;
    display_product();
    clearInput();
}

