// 引入效验规则
import '/moulds/ShopForm.js';
const { createShopFormSchema } = window.moulds;

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
            <div class="error"></div>
        </li>
    `)
    document.querySelector('#app').innerHTML = `
        <h1>店铺列表：</h1>
        <ul class="shop-list">${items.join('')}</ul>
        <h1>新增店铺：</h1>
        <form action="/api/shop" method="post">
            <label for="shopName">新的店铺名：</label>
            <input type="text" id="shopName" name="name">
            <button type="submit" data-type="create">确定创建</button>
            <span class="error"></span>
        </form>
    `;
}

/**
 * 事件绑定
 */
export async function bindShopInfoEvents () {
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
            case 'create':
                await handleCreateShop(e);
                break;
        }
    })
}

/**
 * 创建商铺
 * @returns {Promise<void>}
 */
export async function handleCreateShop(e) {
    e.preventDefault();
    const name = e.target.parentElement.querySelector('input[name=name]').value;

    try {
        await createShopFormSchema().validate({name})
    } catch (error) {
        e.target.parentElement.querySelector('.error').innerHTML = error.message;
        return
    }

    await fetch('/api/shop', {
        method: 'POST',
        headers: {
            'Csrf-Token': __CSRF_TOKEN__,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `name=${encodeURIComponent(name)}`
    });

    // 更新商品列表
    await refreshShopList();
}

/**
 * 修改操作
 * @param {*} e 
 */
export async function handleModifyShopInfo (e) {
    const shopId = e.target.parentNode.dataset.shopId;
    const name = e.target.parentElement.querySelector('input').value;
    try {
        await createShopFormSchema().validate({ name });
    } catch (error) {
        e.target.parentElement.querySelector('.error').innerHTML = error.message;
        return;
    }
    await fetch(`/api/shop/${shopId}?name=${encodeURIComponent(name)}`, {
        method: 'PUT',
        headers: {
            'Csrf-Token': __CSRF_TOKEN__,
        },
    });
    await refreshShopList();
}

/**
 * 删除
 * @param {*} e 
 */
export async function handleRemoveShopInfo (e) {
    const shopId = e.target.parentNode.dataset.shopId;
    await fetch(`/api/shop/${shopId}`, {
        method: 'DELETE',
        headers: {
            'Csrf-Token': __CSRF_TOKEN__,
        },
    });
    await refreshShopList();
}
