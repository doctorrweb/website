import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'

const getColumnSearch = dataIndex => {
    const [selectedKeys, setSelectedKeys] = useState
    return {
        filterDropdown: filterDropdown(dataIndex, {setSelectedKeys ,selectedKeys}),
        filterIcon: filterIcon(),
        onFilter: onFilter(dataIndex),
        onFilterDropdownVisibleChange: onFilterDropdownVisibleChange(),
        render: render(dataIndex)
    }
}

const filterDropdown = (dataIndex, {
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters
}) => (
    <div style={{ padding: 8 }}>
        <Input
            ref={node => {
                this.searchInput = node
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
        >
      Search
        </Button>
        <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
        >
      Reset
        </Button>
    </div>
)
const filterIcon = filtered => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
)
const onFilter = (dataIndex,value, record) =>
    record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase())
const onFilterDropdownVisibleChange = visible => {
    if (visible) {
        setTimeout(() => this.searchInput.select())
    }
}
const render = (text, dataIndex) =>
    this.state.searchedColumn === dataIndex ? (
        <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
        />
    ) : (
        text
    )

filterDropdown.propTypes = {
    setSelectedKeys: PropTypes.func,
    selectedKeys: PropTypes.array,
    confirm: PropTypes.any,
    clearFilters: PropTypes.any
}

export default getColumnSearch