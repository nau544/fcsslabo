import React from 'react';

// カラム定義の型
type ColumnDefinition = {
    field: string;
    headerName: string;
    width: string;
    editable: boolean;
    type: string;
};

// データ行の型（動的）
type DataRow = {
    id: number;
    [key: string]: any;
};

type GridProps = {
    data: DataRow[];
    columns: ColumnDefinition[];
    isDarkMode: boolean;
    onEdit?: (row: DataRow) => void;
    onDelete?: (row: DataRow) => void;
    selectedUserIds: number[];
    onCheckboxChange: (userId: number) => void;
    onCheckAll: () => void;
    isAllChecked: boolean;
};

const Grid: React.FC<GridProps> = ({
    data,
    columns,
    isDarkMode,
    onEdit,
    onDelete,
    selectedUserIds,
    onCheckboxChange,
    onCheckAll,
    isAllChecked,
}) => {
    // データの値を取得する関数
    const getCellValue = (row: DataRow, field: string) => {
        const value = row[field];
        if (value === null || value === undefined) return '';
        
        // 日時型の場合はフォーマット
        if (typeof value === 'string' && value.includes('T')) {
            try {
                const date = new Date(value);
                return date.toLocaleString('ja-JP');
            } catch {
                return value;
            }
        }
        
        return String(value);
    };

    return (
        <div style={{ width: '100%', borderRadius: '12px', background: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#222', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            {/* ヘッダー用テーブル */}
            <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                    <tr style={{ background: isDarkMode ? '#444' : '#f5f5f5' }}>
                        <th style={{ width: '40px', padding: '8px', textAlign: 'center' }}>
                            <input type="checkbox" checked={isAllChecked} onChange={onCheckAll} />
                        </th>
                        {columns.map((column, index) => (
                            <th key={column.field} style={{ width: column.width, padding: '8px' }}>
                                {column.headerName}
                            </th>
                        ))}
                        <th style={{ width: '20%', padding: '8px' }}>アクティブ</th>
                    </tr>
                </thead>
            </table>
            {/* ボディ用テーブル（スクロール） */}
            <div style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}>
                <table
                    className={`grid-table${isDarkMode ? " dark" : ""}`}
                    style={{
                        width: '100%',
                        tableLayout: 'fixed',
                        borderCollapse: 'separate',
                        borderSpacing: 0,
                    }}
                >
                    <tbody>
                        {data.map((row, idx) => (
                            <tr key={row.id} style={{
                                borderBottom: idx !== data.length - 1 ? `1px solid ${isDarkMode ? '#555' : '#eee'}` : 'none',
                                color: isDarkMode ? '#fff' : '#222'
                            }}>
                                <td style={{ width: '40px', padding: '8px', textAlign: 'center' }}>
                                    <input type="checkbox" checked={selectedUserIds.includes(row.id)} onChange={() => onCheckboxChange(row.id)} />
                                </td>
                                {columns.map((column) => (
                                    <td key={column.field} style={{ width: column.width, padding: '8px' }}>
                                        {getCellValue(row, column.field)}
                                    </td>
                                ))}
                                <td style={{ width: '20%', padding: '8px' }}>
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
                                        <button
                                            style={{
                                                background: "#b71c1c",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "4px",
                                                padding: "4px 12px",
                                                cursor: "pointer",
                                                flex: 1
                                            }}
                                            onClick={() => onEdit && onEdit(row)}
                                        >
                                            編集
                                        </button>
                                        <button
                                            style={{
                                                background: "#b71c1c",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "4px",
                                                padding: "4px 12px",
                                                cursor: "pointer",
                                                flex: 1
                                            }}
                                            onClick={() => onDelete && onDelete(row)}
                                        >
                                            削除
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Grid;
