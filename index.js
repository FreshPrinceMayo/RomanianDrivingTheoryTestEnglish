new Vue({
    el: '#app',
    data: {
        "correct": 0,
        "incorrect": 0,
        "isLoaded": false,
        "json": [],
        "questions": [],
        "questionCount": null,
        "answeredQuestions": 0,
        "answers": [],
        "checkboxGroup": [],
        "checkBoxA": "",
        "checkBoxB": "",
        "checkBoxC": "",
        "submit": null,
        "next": null,
        "checkBoxDisabled": false,
        "sections": [{
                "id": 1,
                "label": "1) DUTIES AND OBLIGATIONS OF DRIVERS"
            },
            {
                "id": 2,
                "label": "2) ECOLOGIC AND PREVENTING DRIVING"
            },
            {
                "id": 3,
                "label": "3) FIRST AID MEASURES"
            },
            {
                "id": 4,
                "label": "4) MECHANICS"
            },
            {
                "id": 5,
                "label": "5) POLICE SIGNALS"
            },
            {
                "id": 6,
                "label": "6) RAILWAY CROSSINGS"
            },
            {
                "id": 7,
                "label": "7) STOPPING STANDING AND PARKING"
            },
            {
                "id": 8,
                "label": "8) TECHNICAL CONDITIONS"
            },
            {
                "id": 9,
                "label": "9) OVERTAKING"
            },
            {
                "id": 10,
                "label": "10) HIGHWAY AND DRIVING POSITION"
            },
            {
                "id": 11,
                "label": "11) RIGHT OF WAY"
            },
            {
                "id": 12,
                "label": "12) PENALTIES AND OFFENCES"
            },
            {
                "id": 13,
                "label": "13) SPEED AND DISTANCE"
            },
            {
                "id": 14,
                "label": "14) GENERAL RULES"
            },
            {
                "id": 15,
                "label": "15) SIGNS AND ROAD MARKINGS"
            },
            {
                "id": 16,
                "label": "16) LIGHT SIGNALS"
            },
            {
                "id": 17,
                "label": "17) MANEUVERS IN TRAFFIC"
            }

        ],
        "keepFirst": false,
        "openOnFocus": true,
        "selected": null,
        "name": ""

    },
    methods: {
        checkAnswers: function () {
            this.submit = false;
            this.next = true;
            this.checkBoxDisabled = true;

            if (this.answers.includes("A")) this.checkBoxA = "correctAnswer";
            if (this.answers.includes("B")) this.checkBoxB = "correctAnswer";
            if (this.answers.includes("C")) this.checkBoxC = "correctAnswer";

        },
        nextQuestion: function () {
            this.submit = true;
            this.next = false;
            this.checkBoxDisabled = false;

            if (_.isEqual(this.answers.sort(), this.checkboxGroup.sort())) {
                this.correct += 1;
            } else {
                this.incorrect += 1;
            }
            this.answeredQuestions = this.correct + this.incorrect;

            this.questions.shift();
            this.setAnswers();
            this.resetCheckBoxCss();
            this.checkboxGroup = [];
            this.checkBoxDisabled = false;
        },
        resetCheckBoxCss() {
            this.checkBoxA = "";
            this.checkBoxB = "";
            this.checkBoxC = "";
        },
        setAnswers: function () {
            this.answers = this.questions[0].options.filter(res => res.correct).map(ele => ele.questionLetter)
        },
        getCss: function (letter) {
            switch (letter) {
                case "A":
                    return this.checkBoxA;
                case "B":
                    return this.checkBoxB;
                case "C":
                    return this.checkBoxC;
            }
        },
        reset:function()
        {
            this.selected = null;
            this.isLoaded = false;
            this.checkboxGroup = [];
            this.checkBoxDisabled = false;
            this.correct = 0;
            this.incorrect = 0;
            this.answeredQuestions = 0;
            this.resetCheckBoxCss();
        }

    },
    beforeMount() {
        // 
        // axios.get('/public/json/section2.json').then(response => {
        //     this.json = response.data;
        //     this.questions = _.shuffle(response.data.questions);
        //     this.isLoaded = true;
        // });
    },
    mounted() {
        // window.addEventListener("keypress", function (e) {
        //     console.log(e.keyCode);
        //         if(e.keyCode == 32)
        //         {
        //             this.checkAnswers();
        //             console.log("a");
        //             if(this.submit & this.optionSelected)
        //             {
        //                 console.log("b");
        //                 this.checkAnswers();
        //             }
        //             else if(this.next)
        //             {
        //                 console.log("c");
        //                 this.nextQuestion();
        //             }
        //         }
        // });
    },
    computed: {
        stepA: function () {
            return this.selected == null;
        },
        stepB: function () {
            if (this.selected != null) {
                let url = 'public/json/section' + this.selected + '.json';
                axios.get(url).then(response => {
                    this.json = response.data;
                    let questionData = response.data.questions;
                    this.questions = _.shuffle(questionData);
                    this.questionCount = questionData.length;
                    this.isLoaded = true;
                    this.next = false;
                    this.submit = true;
                });
            }
            return this.selected != null;
        },
        currentQuestion: function () {
            if (this.isLoaded) {
                this.setAnswers();
                return this.questions[0];
            } else {
                return null;
            }
        },
        submitEnbled: function () {
            return true
        },
        optionSelected: function () {
            return this.checkboxGroup.length != 0;
        },
        filteredDataObj() {
            return this.sections.filter((option) => {
                return option.label
                    .toString()
                    .toLowerCase()
                    .indexOf(this.name.toLowerCase()) >= 0
            })
        }
    }
})