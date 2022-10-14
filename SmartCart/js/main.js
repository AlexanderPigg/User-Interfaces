let startTime = new Date();
let t = setInterval(getTimeElapsed, 1000);

const randCount = 12;

document.getElementById("searchbtn").addEventListener("click", searchItems);
document.getElementById("searchmode").addEventListener("click", searchView);
document.getElementById("couponmode").addEventListener("click", couponView);
document.getElementById("checkout").addEventListener("click", checkout);
document.getElementById("clearlist").addEventListener("click", clearlist);
document.getElementById("clearcart").addEventListener("click", clearcart);

document.getElementById("scanitems").addEventListener("click", addCart);
document.getElementById("scanitem").addEventListener("click", addItemCart);
document.getElementById("listitems").addEventListener("click", addList);
document.getElementById("listitem").addEventListener("click", addItemList);

function getTimeElapsed()
{
  let currTime = new Date();
  let elapTime = currTime.getTime() - startTime.getTime();
  elapTime = elapTime / 1000;
  let seconds = Math.floor(elapTime % 60);
  let minutes = Math.floor(elapTime / 60);
  let hours = Math.floor(elapTime / 3600);
  if (seconds < 10)
  {
    seconds = "0" + seconds.ToString();
  }
  let time = hours.ToString() + ":" + minutes.ToString() + ":" + seconds.ToString();
  document.getElementById('timeelapsed').innerHTML = time;
}

function updateItems(add)
{
  let items = document.getElementById("itemcount").innerHTML.ToInt();
  items = items + add;
  document.getElementById("itemcount").innerHTML = items;
}

function updateCost(price)
{
  let cost = document.getElementById("costcount").innerHTML.ToString().replace('$', '').ToDouble();
  cost = cost + price;
  cost = cost.toFixed(2);
  cost.innerHTML = "$" + cost.ToString();
}

function resetStats()
{
  document.getElementById('timeelapsed').innerHTML = "00:00:00";
  document.getElementById('itemcount').innerHTML = "0";
  document.getElementById('costcount').innerHTML = "$0.00";
}

function searchItems()
{
  let itemCount = 0;
  const matches = [];
  if (searchbar.innerHTML.ToString() != "")
  {
    for (let i = 0; i < items.length; i++)
    {
      matchItems(items[i], itemCount, matches);
    }
  }

  if (itemCount > 4)
  {
   document.getElementById("item").innerHTML = "Please Narrow Your\nSearch to Display\nItems Properly";
  }
  else if (itemCount > 1)
  {
    let ref = document.getElementById("searchbtn");
    for (let i = 0; i < matches.length; i++)
    {
      let name = "item" + i.ToString();
      let el = document.createElement(name);
      el.classList.add('searchitem');
      el.textContent = matches[i]['name'];
      el.addEventListener('click', displayInfo(matches[i]));
      ref.insertAdjacentElement('afterend', el);
    }
  }
  else if (itemCount == 1)
  {
    displayInfo(matches[0]);
  }
  else if (searchbar.innerHTML.ToString() != "")
  {
    document.getElementById("item").innerHTML = "Sorry, No In-Store\nItems Match\nYour Search";
  }
  else
  {
    searchbar.innerHTML = "Search In-Store\nItem to Display\nItem Info";
  }
}

function matchItems(item, count, matches)
{
  if (item['name'].ToString() == searchbar.innerHTML.ToString() || item['name'].ToString().includes(searchbar.innerHTML.ToString()) || searchbar.innerHTML.includes(item['name'].ToString()))
  {
    matches.push(item);
    count++;
  }
}

function findItem(value)
{
  for (let i = 0; i < items.length; i++)
  {
    if (items[i]['name'] == value)
    {
      return items[i];
    }
  }
}

function displayInfo(item)
{
  let area = document.getElementById("item");
  let avail = "No";
  let coup = "No";
  if (item["available"])
  {
    avail = "Yes";
  }
  if (item["coupon"])
  {
    coup = "Yes";
  }
  area.textContent = item['name'] + "\nAvailable: " + avail +
    "\nPrice: $" + item["price"].ToString() + "\nLocation: " +
    item["location"] + "\nCoupons: " + coup;
}

function addItemCart()
{
  let drop = document.getElementById("scandrop");
  let list = document.getElementById("cartlist").innerHTML;
  if (drop.selectedIndex >= 0)
  {
    let value = drop.options[drop.selectedIndex].text;
    if (!list.includes(value))
    {
      list += "\n" + value;
    }
    else
    {
      let dup = value + " ("
      if (list.includes(dup))
      {
        let ind = list.indexOf(dup) + dup.length;
        let strnum = "";
        while (list.charAt(ind) != ')')
        {
          strnum += list.charAt(ind);
          list = list.slice(0, ind) + list.slice(ind + 1);
          ind++;
        }
        let dupnum = strnum.ToInt();
        dupnum++;
        list = list.slice(0, list.indexOf(dup) + dup.length) + dupnum.ToString() + list.slice(ind);
      }
      else
      {
        let sInd = list.indexOf(value) + value.length
        list = list.slice(0, sInd) + " (2)" + list.slice(sInd + 4);
      }
    }
    updateItems(1);
    checkList(value);
    let item = findItem(value);
    updateCost(item['price']);
  }
}

function addCart()
{
  let list = document.getElementById("cartlist").innerHTML;
  for (let i = 0; i < randCount; i++)
  {
    let rInt = Math.floor(Math.random() * items.length;
    let value = items[rInt]['name'];
    if (!list.includes(value))
    {
      list += "\n" + value;
    }
    else
    {
      let dup = value + " ("
      if (list.includes(dup))
      {
        let ind = list.indexOf(dup) + dup.length;
        let strnum = "";
        while (list.charAt(ind) != ')')
        {
          strnum += list.charAt(ind);
          list = list.slice(0, ind) + list.slice(ind + 1);
          ind++;
        }
        let dupnum = strnum.ToInt();
        dupnum++;
        list = list.slice(0, list.indexOf(dup) + dup.length) + dupnum.ToString() + list.slice(ind);
      }
      else
      {
        let sInd = list.indexOf(value) + value.length
        list = list.slice(0, sInd) + " (2)" + list.slice(sInd + 4);
      }
    }
    checkList(value);
    updateCost(item[rInt]['price']);
  }
  updateItems(randCount);
}

function clearCart()
{
  if (confirm("Are you sure you want to clear your cart?") == true)
  {
    document.getElementById("cartlist").innerHTML = "";
  }
  if (document.getElementById("shoplist").innerHTML.includes(" ✓"))
  {
    document.getElementById("shoplist").innerHTML.replaceAll(/ ✓/g, '');
  }
}

function addItemList()
{
  let drop = document.getElementById("listdrop");
  if (drop.selectedIndex >= 0)
  {
    let value = drop.options[drop.selectedIndex].text;
    if (!document.getElementById("shoplist").innerHTML.includes(value))
    {
      document.getElementById("shoplist").innerHTML += "\n" + value;
    }
  }
}

function addList()
{
  for (let i = 0; i < randCount; i++)
  {
    let rInt = Math.floor(Math.random() * items.Length);
    let value = items[rInt]['name'];
    if (!document.getElementById("shoplist").innerHTML.includes(value))
    {
      document.getElementById("shoplist").innerHTML += "\n" + value;
      checkList(value);
    }
  }
}

function checkList(found)
{
  let shop = document.getElementById("shoplist").innerHTML;
  let cart = document.getElementById("cartlist").innerHTML;
  if (shop.includes(found.ToString()) && cart.includes(found.ToString()))
  {
    let done = found.ToString() + " ✓";
    if (!cart.includes(done))
    {
      let index = list.indexOf(found) + found.length();
      list = list.slice(0, list.indexOf(found)) + " ✓" + list.slice(index);
    }
  }
}

function clearList()
{
  if (confirm("Are you sure you want to clear your list?") == true)
  {
    document.getElementById("shoplist").innerHTML = "";
  }
}

function searchView()
{

}

function couponView()
{

}

function checkout()
{
  if (confirm("Are you sure you are ready to checkout?") == true)
  {
    document.getElementById("cartlist").innerHTML = "";
    document.getElementById("shoplist").innerHTML = "";
    resetStats();
  }
}

function fillDrops(drop)
{
  drop.empty();
  for (let i = 0; i < items.length; i++)
  {
    drop.innerHTML = drop.innerHTML + '<option value="' + (i + 1) + '">' + items[i]['name'] + '</option>';
  }
}

{
  let items = [
    {
     "name": "Soda",
     "available": true,
     "price": 1.99,
     "location": "Beverages",
     "coupon": false
    },
    {
     "name": "Milk",
     "available": true,
     "price": 2.49,
     "location": "Dairy",
     "coupon": false
    },
    {
     "name": "Chips",
     "available": true,
     "price": 2.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Eggs",
     "available": true,
     "price": 2.49,
     "location": "Dairy",
     "coupon": false
    },
    {
     "name": "Bread",
     "available": true,
     "price": 2.99,
     "location": "Bakery",
     "coupon": false
    },
    {
     "name": "Cereal",
     "available": true,
     "price": 3.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Oatmeal",
     "available": true,
     "price": 2.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Cheese",
     "available": true,
     "price": 2.99,
     "location": "Dairy",
     "coupon": false
    },
    {
     "name": "Beer",
     "available": true,
     "price": 9.99,
     "location": "Alcohol",
     "coupon": false
    },
    {
     "name": "Water",
     "available": true,
     "price": 4.99,
     "location": "Beverages",
     "coupon": false
    },
    {
     "name": "Chocolate",
     "available": true,
     "price": 1.49,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Cookies",
     "available": true,
     "price": 2.99,
     "location": "Bakery",
     "coupon": false
    },
    {
     "name": "Wine",
     "available": true,
     "price": 12.99,
     "location": "Alcohol",
     "coupon": false
    },
    {
     "name": "Liquor",
     "available": true,
     "price": 19.99,
     "location": "Alcohol",
     "coupon": false
    },
    {
     "name": "Snack Cakes",
     "available": true,
     "price": 3.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Cake",
     "available": true,
     "price": 19.99,
     "location": "Bakery",
     "coupon": false
    },
    {
     "name": "Muffins",
     "available": false,
     "price": 3.99,
     "location": "Bakery",
     "coupon": false
    },
    {
     "name": "Ham",
     "available": true,
     "price": 6.99,
     "location": "Meat/Seafood",
     "coupon": false
    },
    {
     "name": "Bacon",
     "available": true,
     "price": 4.99,
     "location": "Meat/Seafood",
     "coupon": false
    },
    {
     "name": "Jerky",
     "available": true,
     "price": 3.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Pepperoni",
     "available": true,
     "price": 3.99,
     "location": "Meat/Seafood",
     "coupon": false
    },
    {
     "name": "Sausage",
     "available": true,
     "price": 5.99,
     "location": "Meat/Seafood",
     "coupon": false
    },
    {
     "name": "Steak",
     "available": true,
     "price": 11.99,
     "location": "Meat/Seafood",
     "coupon": false
    },
    {
     "name": "Pork Chops",
     "available": false,
     "price": 9.99,
     "location": "Meat/Seafood",
     "coupon": false
    },
    {
     "name": "Beef",
     "available": true,
     "price": 7.99,
     "location": "Meat/Seafood",
     "coupon": false
    },
    {
     "name": "Hot Dogs",
     "available": true,
     "price": 5.99,
     "location": "Meat/Seafood",
     "coupon": false
    },
    {
     "name": "Turkey",
     "available": false,
     "price": 7.99,
     "location": "Meat/Seafood",
     "coupon": false
    },
    {
     "name": "Chicken",
     "available": true,
     "price": 6.99,
     "location": "Meat/Seafood",
     "coupon": false
    },
    {
     "name": "Fish",
     "available": true,
     "price": 7.99,
     "location": "Meat/Seafood",
     "coupon": false
    },
    {
     "name": "Shrimp",
     "available": true,
     "price": 7.99,
     "location": "Meat/Seafood",
     "coupon": false
    },
    {
     "name": "Breakfast Bars",
     "available": true,
     "price": 2.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Candy",
     "available": true,
     "price": 2.49,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Coffee",
     "available": true,
     "price": 7.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Yogurt",
     "available": true,
     "price": 1.49,
     "location": "Dairy",
     "coupon": false
    },
    {
     "name": "Ice Cream",
     "available": true,
     "price": 3.99,
     "location": "Frozen",
     "coupon": false
    },
    {
     "name": "Juice",
     "available": true,
     "price": 1.99,
     "location": "Beverages",
     "coupon": false
    },
    {
     "name": "Peanut Butter",
     "available": true,
     "price": 2.49,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Jelly",
     "available": true,
     "price": 2.49,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Apple",
     "available": true,
     "price": 1.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Bananas",
     "available": true,
     "price": 1.99,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Lemon",
     "available": true,
     "price": 1.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Orange",
     "available": true,
     "price": 1.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Grapes",
     "available": true,
     "price": 2.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Lime",
     "available": false,
     "price": 1.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Strawberries",
     "available": true,
     "price": 2.99,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Cherries",
     "available": true,
     "price": 2.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Cranberries",
     "available": true,
     "price": 2.99,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Raspberries",
     "available": true,
     "price": 2.99,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Mango",
     "available": false,
     "price": 1.99,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Pear",
     "available": true,
     "price": 1.99,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Watermelon",
     "available": true,
     "price": 3.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Tomato",
     "available": true,
     "price": 1.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Potato",
     "available": true,
     "price": 1.99,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Cucumber",
     "available": true,
     "price": 1.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Corn",
     "available": true,
     "price": 2.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Cabbage",
     "available": true,
     "price": 1.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Onion",
     "available": false,
     "price": 1.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Garlic",
     "available": true,
     "price": 1.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Brocoli",
     "available": true,
     "price": 1.99,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Celery",
     "available": true,
     "price": 1.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Carrot",
     "available": true,
     "price": 1.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Asparagus",
     "available": true,
     "price": 2.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Lettuce",
     "available": true,
     "price": 1.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Spinach",
     "available": true,
     "price": 1.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Bell Pepper",
     "available": false,
     "price": 1.99,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Ketchup",
     "available": true,
     "price": 2.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Mustard",
     "available": false,
     "price": 2.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Mayonnaise",
     "available": true,
     "price": 2.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Pizza",
     "available": true,
     "price": 5.99,
     "location": "Frozen",
     "coupon": false
    },
    {
     "name": "Pancakes",
     "available": false,
     "price": 3.99,
     "location": "Frozen",
     "coupon": false
    },
    {
     "name": "Waffles",
     "available": true,
     "price": 3.99,
     "location": "Frozen",
     "coupon": false
    },
    {
     "name": "Biscuits",
     "available": true,
     "price": 2.99,
     "location": "Dairy",
     "coupon": false
    },
    {
     "name": "Rice",
     "available": true,
     "price": 2.49,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Pasta",
     "available": true,
     "price": 1.49,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Pasta Sauce",
     "available": true,
     "price": 2.49,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Baked Beans",
     "available": true,
     "price": 2.49,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Green Beans",
     "available": true,
     "price": 1.99,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Butter",
     "available": true,
     "price": 2.99,
     "location": "Dairy",
     "coupon": false
    },
    {
     "name": "Whip Cream",
     "available": true,
     "price": 2.99,
     "location": "Dairy",
     "coupon": false
    },
    {
     "name": "Donut",
     "available": false,
     "price": 1.49,
     "location": "Bakery",
     "coupon": false
    },
    {
     "name": "Tv Dinner",
     "available": true,
     "price": 2.99,
     "location": "Frozen",
     "coupon": false
    },
    {
     "name": "Tea",
     "available": true,
     "price": 3.99,
     "location": "Beverages",
     "coupon": false
    },
    {
     "name": "Lemonade",
     "available": true,
     "price": 1.99,
     "location": "Beverages",
     "coupon": false
    },
    {
     "name": "Soup",
     "available": true,
     "price": 1.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Nuts",
     "available": true,
     "price": 2.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Honey",
     "available": false,
     "price": 2.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Maple Syrup",
     "available": true,
     "price": 2.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Energy Drink",
     "available": false,
     "price": 1.99,
     "location": "Beverages",
     "coupon": false
    },
    {
     "name": "Sports Drink",
     "available": true,
     "price": 1.99,
     "location": "Beverages",
     "coupon": false
    },
    {
     "name": "Cooking Oil",
     "available": true,
     "price": 2.99,
     "location": "Baking Needs",
     "coupon": false
    },
    {
     "name": "Flour",
     "available": true,
     "price": 2.99,
     "location": "Baking Needs",
     "coupon": false
    },
    {
     "name": "Sugar",
     "available": true,
     "price": 2.99,
     "location": "Baking Needs",
     "coupon": false
    },
    {
     "name": "Salt",
     "available": true,
     "price": 2.49,
     "location": "Baking Needs",
     "coupon": false
    },
    {
     "name": "Pepper",
     "available": true,
     "price": 1.99,
     "location": "Baking Needs",
     "coupon": false
    },
    {
     "name": "Ramen",
     "available": true,
     "price": 0.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Salsa",
     "available": true,
     "price": 2.49,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Tortillas",
     "available": false,
     "price": 1.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "BBQ Sauce",
     "available": true,
     "price": 2.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Soy Sauce",
     "available": true,
     "price": 2.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Gum",
     "available": true,
     "price": 1.49,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Ice",
     "available": true,
     "price": 1.99,
     "location": "Frozen",
     "coupon": false
    },
    {
     "name": "Vinegar",
     "available": false,
     "price": 2.99,
     "location": "Baking Needs",
     "coupon": false
    },
    {
     "name": "Mushrooms",
     "available": true,
     "price": 2.49,
     "location": "Produce",
     "coupon": false
    },
    {
     "name": "Sour Cream",
     "available": true,
     "price": 2.49,
     "location": "Dairy",
     "coupon": false
    },
    {
     "name": "Cream Cheese",
     "available": false,
     "price": 2.49,
     "location": "Dairy",
     "coupon": false
    },
    {
     "name": "Shredded Cheese",
     "available": true,
     "price": 3.49,
     "location": "Dairy",
     "coupon": false
    },
    {
     "name": "Olives",
     "available": true,
     "price": 2.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Pickles",
     "available": true,
     "price": 2.99,
     "location": "Packaged Goods",
     "coupon": false
    },
    {
     "name": "Crackers",
     "available": true,
     "price": 2.99,
     "location": "Packaged Goods",
     "coupon": false
    },
  ];
}