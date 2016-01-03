LookupList = React.createClass({
    propTypes: {
        listObjects: React.PropTypes.object.isRequired //RiseSharedConstants.Situations
        , selectListObject:  React.PropTypes.func.isRequired
    },


    createList() {
        return (
            <div className="ui list">
                {this.createListItems()}
            </div>

        );
    },

    createListItems() {
        let items = _.map(this.props.listObjects,  (listObject) => {
            // generate an icon button for the object
            return this.createItem(listObject);

        });

        return items;
    },

    createItem(listObject) {

        let  buttKey = listObject.key
            , leftButtClass = `ui ${listObject.colour} button`
            , icoClass = `ui huge circular inverted ${listObject.colour} ${listObject.icon} icon`
            , description = listObject.description
            ;

        return (
            <div key={buttKey} className="item" onClick={this.props.selectListObject.bind(null, buttKey)}>
                <h2 className="ui left aligned header">
                    <i className={icoClass}></i>
                    <div className="content">
                        <a className="header">
                            {description}
                        </a>
                    </div>
                </h2>

            </div>
        );
    },

    render() {
        return (
            <div>
                {this.createList()}
            </div>
        );
    }

});