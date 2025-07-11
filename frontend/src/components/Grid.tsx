import React from 'react';

type GridProps = {
    data: { id: number; name: string; value: string }[];
    isDarkMode: boolean;
    onEdit?: (row: { id: number; name: string; value: string }) => void;
    onDelete?: (row: { id: number; name: string; value: string }) => void;
    selectedUserIds: number[];
    onCheckboxChange: (userId: number) => void;
    onCheckAll: () => void;
    isAllChecked: boolean;
};

const Grid: React.FC<GridProps> = ({
    data,
    isDarkMode,
    onEdit,
    onDelete,
    selectedUserIds,
    onCheckboxChange,
    onCheckAll,
    isAllChecked,
}) => {
    return (
        <div style={{ width: '100%', borderRadius: '12px', background: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#222', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            {/* ヘッダー用テーブル */}
            <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                    <tr style={{ background: isDarkMode ? '#444' : '#f5f5f5' }}>
                        <th style={{ width: '40px', padding: '8px', textAlign: 'center' }}>
                            <input type="checkbox" checked={isAllChecked} onChange={onCheckAll} />
                        </th>
                        <th style={{ width: '10%', padding: '8px' }}>ID</th>
                        <th style={{ width: '25%', padding: '8px' }}>名前</th>
                        <th style={{ width: '35%', padding: '8px' }}>メールアドレス</th>
                        <th style={{ width: '20%', padding: '8px' }}>アクティブ</th>
                    </tr>
                </thead>
            </table>
            {/* ボディ用テーブル（スクロール） */}
            <div style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}>
                <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'separate', borderSpacing: 0 }}>
                    <tbody>
                        {data.map((row, idx) => (
                            <tr key={row.id} style={{
                                borderBottom: idx !== data.length - 1 ? `1px solid ${isDarkMode ? '#555' : '#eee'}` : 'none',
                                background: isDarkMode ? '#333' : '#fff',
                                color: isDarkMode ? '#fff' : '#222'
                            }}>
                                <td style={{ width: '40px', padding: '8px', textAlign: 'center' }}>
                                    <input type="checkbox" checked={selectedUserIds.includes(row.id)} onChange={() => onCheckboxChange(row.id)} />
                                </td>
                                <td style={{ width: '10%', padding: '8px' }}>{row.id}</td>
                                <td style={{ width: '25%', padding: '8px' }}>{row.name}</td>
                                <td style={{ width: '35%', padding: '8px' }}>{row.value}</td>
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
