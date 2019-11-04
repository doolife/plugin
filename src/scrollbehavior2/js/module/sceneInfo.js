const objScene = [
    {
        key:"scene1",
        ele:document.querySelector("[data-scene='scene1']"),
        sub:[
            {
                key:"scene1-1",
                ele:document.querySelector("[data-scene='scene1-1']")
            },
            {
                key:"scene1-2",
                ele:document.querySelector("[data-scene='scene1-2']")
            }
        ]
    },
    {
        key:"scene2",
        ele:document.querySelector("[data-scene='scene2']"),
        sub:[
            {
                key:"scene2-1",
                ele:document.querySelector("[data-scene='scene2-1']")
            },
            {
                key:"scene2-2",
                ele:document.querySelector("[data-scene='scene2-2']")
            }
        ]
    },
    {
        key:"scene3",
        ele:document.querySelector("[data-scene='scene3']"),
        sub:[
            {
                key:"scene3-1",
                ele:document.querySelector("[data-scene='scene3-1']")
            }
        ]
    },
    {
        key:"scene4",
        ele:document.querySelector("[data-scene='scene4']"),
        sub:[
            {
                key:"scene4-1",
                ele:document.querySelector("[data-scene='scene4-1']")
            },
            // {
            //     key:"scene4-2",
            //     ele:document.querySelector("[data-scene='scene4-2']")
            // },
            {
                key:"scene4-3",
                ele:document.querySelector("[data-scene='scene4-3']")
            }
        ]
    }
];

export default objScene;