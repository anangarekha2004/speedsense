package com.speedsense.app.data.model

import com.google.firebase.firestore.ServerTimestamp
import java.util.Date

data class Expense(
    val id: String = "",
    val amount: Double = 0.0,
    val category: String = "",
    val notes: String = "",
    @ServerTimestamp val date: Date? = null,
    val userId: String = ""
)

enum class Category(val displayName: String) {
    FOOD("Food"),
    TRANSPORT("Transport"),
    BILLS("Bills"),
    SHOPPING("Shopping"),
    OTHERS("Others")
}
