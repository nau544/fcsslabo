import React from 'react';

type GridProps = {
    data: { id: number; name: string; value: string }[];
    isDarkMode: boolean;
    onEdit?: (row: { id: number; name: string; value: string }) => void;
    onDelete?: (row: { id: number; name: string; value: string }) => void;
    selectedUserIds: number[];
    onCheckboxChange: (userId: number) => void;
};

const Grid: React.FC<GridProps> = ({
    data,
    isDarkMode,
    onEdit,
    onDelete,
    selectedUserIds,
    onCheckboxChange,
}) => {
    return (
        <table
            style={{
                width: '100%',
                tableLayout: 'fixed', // 追加: 幅指定を安定させる
                borderCollapse: 'separate',
                borderSpacing: 0,
                borderRadius: '12px',
                overflow: 'hidden',
                background: isDarkMode ? '#333' : '#fff',
                color: isDarkMode ? '#fff' : '#222'
            }}
        >
            <thead>
                <tr style={{ background: isDarkMode ? '#444' : '#f5f5f5' }}>
                    <th style={{ width: '40px', padding: '8px' }}></th> {/* チェックボックス用: 固定幅 */}
                    <th style={{ width: '10%', padding: '8px' }}>ID</th>
                    <th style={{ width: '25%', padding: '8px' }}>名前</th>
                    <th style={{ width: '35%', padding: '8px' }}>メールアドレス</th>
                    <th style={{ width: '20%', padding: '8px' }}>アクティブ</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, idx) => (
                    <tr key={row.id}
                        style={{
                            borderBottom: idx !== data.length - 1 ? `1px solid ${isDarkMode ? '#555' : '#eee'}` : 'none',
                            background: isDarkMode ? '#333' : '#fff',
                            color: isDarkMode ? '#fff' : '#222'
                        }}
                    >
                        <td style={{ padding: '8px', textAlign: 'center' }}>
                            <input
                                type="checkbox"
                                checked={selectedUserIds.includes(row.id)}
                                onChange={() => onCheckboxChange(row.id)}
                            />
                        </td>
                        <td style={{ padding: '8px' }}>{row.id}</td>
                        <td style={{ padding: '8px' }}>{row.name}</td>
                        <td style={{ padding: '8px' }}>{row.value}</td>
                        <td style={{ padding: '8px' }}>
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
    );
};

export default Grid;
