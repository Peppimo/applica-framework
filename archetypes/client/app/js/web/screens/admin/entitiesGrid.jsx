"use strict";

import {entities as EntitiesStore} from "../../../stores"
import {Layout, Screen} from "../../components/layout"
import strings from "../../../strings"
import {loadEntities, deleteEntities} from "../../../actions"
import {connect, connectDiscriminated} from "../../utils/aj"
import {HeaderBlock, FloatingButton} from "../../components/common"
import {Grid, TextCell, CheckCell, ActionsCell, resultToGridData} from "../../components/grids"
import * as query from "../../../api/query"
import {format} from "../../../utils/lang"
import {discriminated} from "../../../utils/ajex"

function isCancel(which) {
    return which == 46 || which == 8
}

function isEsc(which) {
    return which == 27
}

export default class EntitiesGrid extends Screen {
    constructor(props) {
        super(props)

        let _query = query.create()
        _query.page = 1
        _query.rowsPerPage = 5

        this.state = {grid: null, result: null, query: _query}

        this.state.query.on("change", () => {
            this.onQueryChanged()
        })

        this.discriminator = "entity_grid_" + this.props.entity

        connectDiscriminated(this.discriminator, this, [EntitiesStore])
    }

    componentDidMount() {
        loadEntities({discriminator: this.discriminator, entity: this.props.entity, query: this.state.query})
    }

    onQueryChanged() {
        loadEntities({discriminator: this.discriminator, entity: this.props.entity, query: this.state.query})
    }

    createEntity() {

    }

    deleteEntities() {
        let selection = this.refs.grid.getSelection()
        if (_.isEmpty(selection)) {
            return
        }

        swal({ title: strings.confirm, text: format(strings.entityDeleteConfirm, selection.length), showCancelButton: true })
            .then(() => {
                deleteEntities({entity: this.props.entity, ids: selection.map(s => s.id)})
            })
            .catch(() => {})
    }

    onGridKeyDown(e) {
        if (isCancel(e.which)) {
            this.deleteEntities()
        } else if (isEsc(e.which)) {
            this.refs.grid.clearSelection()
        }
    }

    render() {
        let actions = [
            {
                type: "button",
                icon: "zmdi zmdi-refresh-alt",
                tooltip: strings.refresh,
                action: () => { loadEntities({discriminator: this.discriminator, entity: this.props.entity, query: this.state.query}) }
            },
            {
                type: "button",
                icon: "zmdi zmdi-plus",
                tooltip: strings.create,
                action: () => { swal("Ciao") }
            },
            {
                type: "button",
                icon: "zmdi zmdi-delete",
                tooltip: strings.delete,
                action: () => { this.deleteEntities() }
            },
            {
                type: "button",
                icon: "zmdi zmdi-select-all",
                tooltip: strings.selectAll,
                action: () => { this.refs.grid.toggleSelectAll() }
            }

        ]

        let descriptor = {
            columns: [
                {property: "name", header: "Name", cell: TextCell, sortable: true, searchable: true},
                {property: "mail", header: "Mail", cell: TextCell, sortable: true, searchable: true},
                {property: "active", header: "Active", cell: CheckCell, sortable: true, searchable: true}
            ]
        }

        let data = resultToGridData(this.state.result)

        let rows = []
        for (let x = 0; x < 34; x++) {
            let xo = {
                index: x,
                selected: false,
                expanded: false,
                data: { name: "name" + x, mail: "mail" + x, active: true },
                children: []
            }
            for (let y = 0; y < 4; y++) {
                let yo = {
                    index: y,
                    selected: false,
                    expanded: false,
                    data: { name: "name" + x + y, mail: "mail" + x + y, active: true },
                    children: []
                }

                xo.children.push(yo)

                for (let z = 0; z < 5; z++) {
                    let zo = {
                        index: z,
                        selected: false,
                        expanded: false,
                        data: { name: "name" + x + y + z, mail: "mail" + x + y + z, active: true },
                        children: []
                    }

                    for (let h = 0; h < 5; h++) {
                        let ho = {
                            index: h,
                            selected: false,
                            expanded: false,
                            data: { name: "name" + x + y + z + h, mail: "mail" + x + y + z + h, active: true },
                            children: null
                        }

                        zo.children.push(ho)
                    }

                    yo.children.push(zo)
                }
            }

            rows.push(xo)
        }


        return (
            <Layout>
                <HeaderBlock title="Users" subtitle="Manage system users" actions={actions}/>
                <Grid ref="grid" descriptor={descriptor} data={{rows: rows, totalRows: 100}} query={this.state.query} onKeyDown={this.onGridKeyDown.bind(this)} />
                <FloatingButton icon="zmdi zmdi-plus" onClick={this.createEntity.bind(this)} />
            </Layout>
        )
    }
}

