function initializeOptionsEditor(el, data, resultCtl) {

    var optionsEditor = $(el);
    var previouslyChecked;

    var optionsTable = {
        template: '#options-table',
        props: ['value'],
        name: 'options-table',
        computed: {
            list: {
                get: function() {
                    return this.value;
                },
                set: function(value) {
                    this.$emit('input', value);
                }
            } 
        },
        methods: {
            add: function () {
                this.list.push({ name: '', value: ''});
            },
            remove: function (index) {
                this.list.splice(index, 1);
            },
            uncheck: function (index) {
                if (index == previouslyChecked) {
                    $('#customRadio_' + index)[0].checked = false;
                    previouslyChecked = null;
                }
                else {
                    previouslyChecked = index;
                }

            },
            getFormattedList: function () {
                return JSON.stringify(this.list.filter(function (x) { return !IsNullOrWhiteSpace(x.name) && !IsNullOrWhiteSpace(x.value) }));
            },
        }
    };

    new Vue({
        components: {
            optionsTable: optionsTable
        },
        el: optionsEditor.get(0),
        data: {
            option: data,
            dragging: false
        }
    });

}

function IsNullOrWhiteSpace(str) {
    return str === null || str.match(/^ *$/) !== null;
}