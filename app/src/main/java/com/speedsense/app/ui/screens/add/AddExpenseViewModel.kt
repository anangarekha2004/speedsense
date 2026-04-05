package com.speedsense.app.ui.screens.add

import androidx.lifecycle.ViewModel
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.speedsense.app.data.model.Expense

class AddExpenseViewModel : ViewModel() {
    private val db = FirebaseFirestore.getInstance()
    private val auth = FirebaseAuth.getInstance()

    fun addExpense(amount: Double, category: String, notes: String, onComplete: () -> Unit) {
        val userId = auth.currentUser?.uid ?: return
        val expense = Expense(
            amount = amount,
            category = category,
            notes = notes,
            userId = userId
        )
        
        db.collection("expenses")
            .add(expense)
            .addOnSuccessListener { onComplete() }
    }
}
