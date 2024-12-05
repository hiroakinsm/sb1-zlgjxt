# 既存のルートに追加
@app.get("/api/document-controls")
async def get_document_controls(current_user: str = Depends(get_current_user)):
    """ドキュメント制御設定の取得"""
    try:
        data_manager = DataManager(app.config)
        await data_manager.initialize()

        async with data_manager.pg_pool.acquire() as conn:
            controls = await conn.fetch(
                """
                SELECT control_key, control_value, control_description 
                FROM document_control_master
                """
            )
            return {
                "controls": [
                    {
                        "key": control["control_key"],
                        "value": control["control_value"],
                        "description": control["control_description"]
                    }
                    for control in controls
                ]
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/document-controls/{control_key}")
async def update_document_control(
    control_key: str,
    control_value: str,
    current_user: str = Depends(get_current_user)
):
    """ドキュメント制御設定の更新"""
    try:
        data_manager = DataManager(app.config)
        await data_manager.initialize()

        async with data_manager.pg_pool.acquire() as conn:
            await conn.execute(
                """
                UPDATE document_control_master 
                SET control_value = $1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE control_key = $2
                """,
                control_value,
                control_key
            )
            return {"message": "設定を更新しました"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))