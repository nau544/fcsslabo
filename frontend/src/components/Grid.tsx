import React from 'react';

type GridProps = {
    data: { id: number; name: string; value: string }[];
    isDarkMode: boolean;
};

const Grid: React.FC<GridProps> = ({ data, isDarkMode }) => (
    <div
        style={{
            width: '70%',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: isDarkMode ? '#333' : '#fff',
            padding: '20px 0',
            margin: '0 auto',
            borderRadius: '12px',
            boxShadow: isDarkMode ? '0 4px 16px rgba(255,255,255,0.1)' : '0 4px 16px rgba(0,0,0,0.12)',
            border: isDarkMode ? '1px solid #555' : '1px solid #ddd',
            color: isDarkMode ? '#fff' : '#222',
        }}
    >
        <table style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
            borderRadius: '12px',
            overflow: 'hidden',
            background: isDarkMode ? '#333' : '#fff',
            color: isDarkMode ? '#fff' : '#222'
        }}>
            <thead>
                <tr style={{ background: isDarkMode ? '#444' : '#f5f5f5' }}>
                    <th style={{ color: isDarkMode ? '#fff' : '#222', padding: '8px' }}>ID</th>
                    <th style={{ color: isDarkMode ? '#fff' : '#222', padding: '8px' }}>名前</th>
                    <th style={{ color: isDarkMode ? '#fff' : '#222', padding: '8px' }}>メールアドレス</th>
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
                        <td style={{ color: isDarkMode ? '#fff' : '#222', padding: '8px' }}>{row.id}</td>
                        <td style={{ color: isDarkMode ? '#fff' : '#222', padding: '8px' }}>{row.name}</td>
                        <td style={{ color: isDarkMode ? '#fff' : '#222', padding: '8px' }}>{row.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default Grid;
