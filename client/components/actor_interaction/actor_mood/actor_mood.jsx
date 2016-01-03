
ActorMoodRating = React.createClass({
    //propTypes: {
    //    closeSidebar: React.PropTypes.func.isRequired
    //},
    componentDidMount(){
        console.log('mounting segsmile');
        //debugger;

        //selector cache
        let $moodModal = $('.actor.mood .options.modal')

            , $happy = $moodModal.find('#happy')
            , $meh = $moodModal.find('#meh')
            , $frown = $moodModal.find('#frown')
            , $butts = $moodModal.find('.menu .item')
            ;

        $moodModal.modal({debug: true})
            .modal({
                onDeny: ()=> {
                    console.log('denied');
                    return false;
                }
                , onApprove: ()=> {
                    console.log('approved')
                }
                , closable: false //no x-out: force a choice
                , transition: 'fly left'
            });

        // event handlers
        handler = {
            postIt: function () {
                let cur = $(this)
                    , props = this.props
                    , curEnum = cur.data('enum')
                    ;

                console.log(curEnum);

                $moodModal.modal('hide');
                // debugger;

                // todo: WTF: props are undefined ??!!
                //props.closeSidebar();


                ;
            },
            decrementIt: function () {
                console.log('down vote It');
                let curRate = $RatingDlg.rating('get rating');
                $RatingDlg.rating('set rating', curRate - 1);

                ;
            }
        };

        $moodModal.modal('attach events', '.button.smilelauncher', 'show')
        $butts
            .on('click', handler.postIt)
        ;


    },
    render() {
        return (
            <div className="actor mood">

                <button className="ui big icon button smilelauncher item">
                    <i className=" huge heart icon"></i>
                    Your Mood
                </button>


                <div className="ui inverted options modal">
                    <div className="header">
                        How's your brains?
                    </div>

                    <div className="ui icon menu">
                        <button className="item" id="happy" data-enum="1">
                            <i className=" huge yellow smile icon"></i>
                            Happy
                        </button>
                        <button className="item" id="meh" data-enum="0">
                            <i className=" huge blue meh icon"></i>
                            Meh
                        </button>
                        <button className="item" id="frown" data-enum="-1">
                            <i className=" huge red frown icon"></i>
                            Unhappy
                        </button>
                    </div>
                    <div className="actions">
                        <div className="ui black deny button">
                            Nope
                        </div>
                        <div className="ui positive right labeled icon button">
                            Yep, that's me
                            <i className="checkmark icon"></i>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
});