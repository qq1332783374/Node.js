/**
 * dom 节点初始化
 */
export async function refreshShopList () {
    // 发起请求
    const res = await fetch('/api/shop');
    const {data: shopList} = await res.json();
    const items = shopList.map(({ id, name }) =>
     `
        <li data-shop-id="${id}">
            <div data-type="text">${name}</div>
            <input type="text" placeholder="输入新的店铺名称" />
            <a href="#" data-type="modify">确认修改</a>
            <a href="#" data-type="remove">删除店铺</a>
        </li>
    `)
    document.querySelector('#app').innerHTML = `
        <h1>店铺列表：</h1>
        <ul class="shop-list">${items.join('')}</ul>
    `;
}

/**
 * 事件绑定
 */
export async function bindShopInfoEvents () {
    console.log('事件绑定');
    document.querySelector('#app').addEventListener('click', async function (e) {
        e.preventDefault();
        console.log('e.target.dataset.type', e.target.dataset.type);
        switch (e.target.dataset.type) {
            case 'modify':
                await handleModifyShopInfo(e);
                break;
            case 'remove':
                await handleRemoveShopInfo(e);
                break;
        }
    })
}

/**
 * 修改操作
 * @param {*} e 
 */
export async function handleModifyShopInfo (e) {
    const shopId = e.target.parentNode.dataset.shopId;
    const name = e.target.parentElement.querySelector('input').value;
    if (!name) {
        alert('店铺名不能为空！');
        return
    }
    await fetch(`/api/shop/${shopId}?name=${encodeURIComponent(name)}`, {
        method: 'PUT'
    });
    await refreshShopList();
}

/**
 * 删除
 * @param {*} e 
 */
export async function handleRemoveShopInfo (e) {
    const shopId = e.target.parentNode.dataset.shopId;
    await fetch(`/api/shop/${shopId}`, { method: 'DELETE' });
    await refreshShopList();
}
