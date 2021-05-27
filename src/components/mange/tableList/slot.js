export default {
    name: 'TableSlot',
    functional: true,
    render: (h, data) => {
        const params = {
            row: data.props.row,
            index: data.props.index
        }

        if (data.props.column) params.column = data.props.column
        return data.props.render(h, params)
    },
    props: {
        render: Function,
        row: Object,
        index: Number,
        column: {
            type: Object,
            default: null,
        },
    }
}