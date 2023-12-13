import '../sass/index.scss';
import Selectbox from './page/selectbox';

const selectbox1 = new Selectbox({
    el: "#select1",
    items: [
        {label: '옵션1-1 - 배열', value: [1, 2, 3] },
        {label: '옵션1-2 - 오브젝트', value: { a: 1, b: 2, c: 3 } },
        {label: '옵션1-3 - 문자열', value: 'server_04' },
        {label: '옵션1-4 - 숫자', value: 4 }
    ],
    placeholder:'캐릭터를 선택해주세요.1',
    disabled: false
});

const selectbox2 = new Selectbox({
    el:"#select2",
    items: [
        {label: '옵션2-1 - 배열', value: [1, 2, 3]},
        {label: '옵션2-2 - 오브젝트', value: {"serverid":3,"servername":"서버네임2-2","serveridx":0} },
        {label: '옵션2-3 - 문자열', value: 'server_03' },
    ],
    placeholder:'캐릭터를 선택해주세요.2',
    disabled: false
});

const selectbox3 = new Selectbox({
    el:"#select3",
    items: [
        {label: '숫자1', value:1},
        {label: '숫자2', value:2 },
        {label: '숫자3', value:3 },
        {label: '숫자4', value:4},
        {label: '숫자5', value:5},
        {label: '숫자6', value:6},
    ],
    placeholder:'캐릭터를 선택해주세요.3',
    disabled: false
});

selectbox1.on("change", () => {
    console.log(selectbox1.selectedValue, selectbox1.selectedLabel);
});

selectbox2.on("change", () => {
    console.log(selectbox2.selectedValue, selectbox2.selectedLabel);
});

selectbox3.on("change", () => {
    console.log(selectbox3.selectedValue, selectbox3.selectedLabel);
});

// selectbox3.update({
//     selected: 1,
//     disabled: true,
//     items: [
//         {label: '숫자122', value:4},
//         {label: '숫자2222', value:3 },
//         {label: '숫자3222', value:2 },
//         {label: '숫자42222', value:1},
//     ],
// });