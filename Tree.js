'use strict';

/**
 *
 * @param list {Array} data of Tree;
 * @param key  {String}
 * @param value {String}
 * @param children  {String} the children key, default:'children'
 * @param sortBy    {String} sort by key
 * @param order     {String} order by {desc | asc}  default:'desc'
 */
class Tree {
  constructor(
    {
      list,
      key,
      value,
      children,
      sortBy,
      order
    }
  ) {
    this.list = list;
    this.key = key;
    this.value = value;
    this.children = children || 'children';
    this.sortBy = sortBy;
    this.order = order || 'desc'

    this._node = null;
    this._nodes = [];
    this._parentNode = null;

    this.findNode(this.list);
  }

  findNode(list) {
    let {key, value, children, sortBy, order} = this;
    let _list = sortBy ? this.sortList(list, sortBy, order) : list;
    for (let item of _list) {
      if (item[key] === value) {
        this._node = item;
      }
      if (item[children]) {
        this.findChildrenNode(item[children]);
      }
    }
  }

  findChildrenNode(childrenList) {
    let {key, value, children, sortBy, order} = this;
    let _list = sortBy ? this.sortList(childrenList, sortBy, order) : childrenList;
    for (let item of _list) {
      if (item[key] === value) {
        this._node = item;
        this._nodes.push(item)
      }

      if (item[children]) {
        this._parentNode = item;
        this._node = this.findChildrenNode(item[children]);
      }
    }

    return this._node;
  }

  getTree() {
    return this.list;
  }

  getNode() {
    return this._node;
  }

  getNodes() {
    return this._nodes;
  }


  getParentNode() {
    return this._parentNode;
  }

  sortList(list, key, order) {
    let _list = list || [];
    _list.sort((a, b) => {
      if (order === 'desc') {
        return a[key] - b[key];
      } else if (order === 'asc') {
        return b[key] - a[key];
      }
    })

    return _list;
  }
}

// const tree = [
//   {id: 1},
//   {
//     id: 3,
//     children: [
//       {id: 20, value: 'hd',   selected:true,},
//
//     ]
//   },
//   {
//     id: 2,
//     children: [
//       {
//         id: 30,
//         value: 'yy',
//         children: [
//           {
//             id: 300,
//             value: 'cheese1',
//             children: [
//               {
//                 id: 3000,
//                 value: 'cheese22',
//                 children: [
//                   {
//                     id: 30006,
//                     value: 'cheese'
//                   },
//                   {
//                     id: 30004,
//                     value: 'cheese2'
//                   },
//                   {
//                     id: 30003,
//                     selected:true,
//                     value: 'cheese3'
//                   },
//                   {
//                     id: 30001,
//                     selected:true,
//                     value: 'cheese4',
//                     chn: 'ccc'
//                   },
//                 ]
//               },
//             ]
//           },
//         ]
//       },
//     ]
//   },
// ];
//
// let t = new Tree({
//   list: tree,
//   key: 'selected',
//   value: true,
//   sortBy: 'id',
//   order:'asc'
// })
//
// console.log(t)


export default Tree
