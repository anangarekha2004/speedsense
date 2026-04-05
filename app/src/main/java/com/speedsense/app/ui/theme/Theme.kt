package com.speedsense.app.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF4F46E5), // Indigo 600
    onPrimary = Color.White,
    primaryContainer = Color(0xFFEEF2FF), // Indigo 50
    onPrimaryContainer = Color(0xFF4338CA), // Indigo 700
    secondary = Color(0xFF64748B), // Slate 500
    onSecondary = Color.White,
    secondaryContainer = Color(0xFFF1F5F9), // Slate 100
    onSecondaryContainer = Color(0xFF334155), // Slate 700
    background = Color(0xFFF8FAFC), // Slate 50
    onBackground = Color(0xFF0F172A), // Slate 900
    surface = Color.White,
    onSurface = Color(0xFF0F172A), // Slate 900
    error = Color(0xFFE11D48), // Rose 600
    onError = Color.White,
)

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFF818CF8), // Indigo 400
    onPrimary = Color(0xFF0F172A),
    primaryContainer = Color(0xFF312E81), // Indigo 900
    onPrimaryContainer = Color(0xFFE0E7FF), // Indigo 100
    secondary = Color(0xFF94A3B8), // Slate 400
    onSecondary = Color(0xFF0F172A),
    background = Color(0xFF0F172A), // Slate 900
    onBackground = Color(0xFFF8FAFC), // Slate 50
    surface = Color(0xFF1E293B), // Slate 800
    onSurface = Color(0xFFF8FAFC), // Slate 50
)

@Composable
fun SpeedSenseTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
