import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme, ThemeType } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

// Theme presets for future expansion
const THEME_PRESETS = [
    {
        id: 'light',
        name: 'Light',
        description: 'Clean and bright interface',
        icon: 'sun-o' as any,
        colors: {
            primary: '#CBFF00',
            background: '#FFFFFF',
            text: '#000000',
            secondary: '#666666',
            border: '#E0E0E0',
            card: '#F5F5F5',
        },
    },
    {
        id: 'dark',
        name: 'Dark',
        description: 'Easy on the eyes',
        icon: 'moon-o' as any,
        colors: {
            primary: '#CBFF00',
            background: '#000000',
            text: '#FFFFFF',
            secondary: '#999999',
            border: '#333333',
            card: '#0A0A0A',
        },
    },
    {
        id: 'midnight',
        name: 'Midnight',
        description: 'Deep blue darkness',
        icon: 'star-o' as any,
        colors: {
            primary: '#CBFF00',
            background: '#0D1117',
            text: '#F0F6FC',
            secondary: '#8B949E',
            border: '#30363D',
            card: '#161B22',
        },
        comingSoon: true,
    },
    {
        id: 'forest',
        name: 'Forest',
        description: 'Nature-inspired green',
        icon: 'leaf' as any,
        colors: {
            primary: '#CBFF00',
            background: '#0F1419',
            text: '#E6FFFA',
            secondary: '#81C784',
            border: '#2E7D32',
            card: '#1B5E20',
        },
        comingSoon: true,
    },
    {
        id: 'ocean',
        name: 'Ocean',
        description: 'Calming blue depths',
        icon: 'tint' as any,
        colors: {
            primary: '#CBFF00',
            background: '#0A1929',
            text: '#E3F2FD',
            secondary: '#64B5F6',
            border: '#1976D2',
            card: '#1565C0',
        },
        comingSoon: true,
    },
    {
        id: 'sunset',
        name: 'Sunset',
        description: 'Warm orange glow',
        icon: 'fire' as any,
        colors: {
            primary: '#CBFF00',
            background: '#1A0E0A',
            text: '#FFF3E0',
            secondary: '#FFAB91',
            border: '#FF5722',
            card: '#D84315',
        },
        comingSoon: true,
    },
];

const ThemePreviewCard = ({ 
    theme, 
    isSelected, 
    onSelect, 
    currentColors 
}: { 
    theme: typeof THEME_PRESETS[0]; 
    isSelected: boolean; 
    onSelect: () => void;
    currentColors: any;
}) => {
    return (
        <TouchableOpacity
            style={[
                getStyles(currentColors).themeCard,
                isSelected && getStyles(currentColors).selectedThemeCard,
                theme.comingSoon && getStyles(currentColors).comingSoonCard,
            ]}
            onPress={theme.comingSoon ? undefined : onSelect}
            disabled={theme.comingSoon}
        >
            <View style={getStyles(currentColors).themeCardHeader}>
                <View style={[
                    getStyles(currentColors).themeIcon,
                    { backgroundColor: theme.colors.primary + '1A' }
                ]}>
                    <FontAwesome 
                        name={theme.icon} 
                        size={20} 
                        color={theme.colors.primary} 
                    />
                </View>
                <View style={getStyles(currentColors).themeInfo}>
                    <Text style={getStyles(currentColors).themeName}>
                        {theme.name}
                        {theme.comingSoon && (
                            <Text style={getStyles(currentColors).comingSoonText}> (Coming Soon)</Text>
                        )}
                    </Text>
                    <Text style={getStyles(currentColors).themeDescription}>
                        {theme.description}
                    </Text>
                </View>
                {isSelected && !theme.comingSoon && (
                    <FontAwesome 
                        name="check-circle" 
                        size={20} 
                        color={currentColors.primary} 
                    />
                )}
            </View>

            {/* Theme Preview */}
            <View style={[
                getStyles(currentColors).themePreview,
                { backgroundColor: theme.colors.background }
            ]}>
                <View style={[
                    getStyles(currentColors).previewHeader,
                    { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }
                ]}>
                    <View style={[
                        getStyles(currentColors).previewDot,
                        { backgroundColor: theme.colors.primary }
                    ]} />
                    <View style={[
                        getStyles(currentColors).previewLine,
                        { backgroundColor: theme.colors.text + '40' }
                    ]} />
                </View>
                <View style={getStyles(currentColors).previewContent}>
                    <View style={[
                        getStyles(currentColors).previewLine,
                        { backgroundColor: theme.colors.text + '60', width: '80%' }
                    ]} />
                    <View style={[
                        getStyles(currentColors).previewLine,
                        { backgroundColor: theme.colors.text + '40', width: '60%' }
                    ]} />
                    <View style={[
                        getStyles(currentColors).previewAccent,
                        { backgroundColor: theme.colors.primary + '20' }
                    ]}>
                        <View style={[
                            getStyles(currentColors).previewDot,
                            { backgroundColor: theme.colors.primary, width: 6, height: 6 }
                        ]} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default function ThemePage() {
    const router = useRouter();
    const { theme, colors, setTheme } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);

    const handleThemeSelect = (themeId: string) => {
        const validThemeId = themeId as ThemeType;
        setSelectedTheme(validThemeId);
        setTheme(validThemeId);
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <SafeAreaView style={getStyles(colors).container}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            
            {/* Header */}
            <View style={getStyles(colors).header}>
                <TouchableOpacity onPress={handleBack} style={getStyles(colors).backButton}>
                    <FontAwesome name="arrow-left" size={20} color={colors.text} />
                </TouchableOpacity>
                <Text style={getStyles(colors).headerTitle}>Themes</Text>
                <View style={getStyles(colors).placeholder} />
            </View>

            <ScrollView 
                style={getStyles(colors).scrollContainer}
                contentContainerStyle={getStyles(colors).scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Current Theme Section */}
                <View style={getStyles(colors).section}>
                    <Text style={getStyles(colors).sectionTitle}>Current Theme</Text>
                    <Text style={getStyles(colors).sectionDescription}>
                        {THEME_PRESETS.find(t => t.id === selectedTheme)?.name || 'Unknown'} theme is currently active
                    </Text>
                </View>

                {/* Available Themes */}
                <View style={getStyles(colors).section}>
                    <Text style={getStyles(colors).sectionTitle}>Available Themes</Text>
                    <Text style={getStyles(colors).sectionDescription}>
                        Choose from our collection of carefully crafted themes
                    </Text>
                    
                    <View style={getStyles(colors).themesGrid}>
                        {THEME_PRESETS.map((themePreset) => (
                            <ThemePreviewCard
                                key={themePreset.id}
                                theme={themePreset}
                                isSelected={selectedTheme === themePreset.id}
                                onSelect={() => handleThemeSelect(themePreset.id)}
                                currentColors={colors}
                            />
                        ))}
                    </View>
                </View>

                {/* Coming Soon Section */}
                <View style={getStyles(colors).section}>
                    <Text style={getStyles(colors).sectionTitle}>Coming Soon</Text>
                    <Text style={getStyles(colors).sectionDescription}>
                        More themes are in development. Stay tuned for updates!
                    </Text>
                    
                    <View style={getStyles(colors).comingSoonContainer}>
                        <FontAwesome name="magic" size={24} color={colors.primary} />
                        <Text style={getStyles(colors).comingSoonTitle}>Custom Themes</Text>
                        <Text style={getStyles(colors).comingSoonSubtitle}>
                            Create your own personalized themes
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const getStyles = (colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: `${colors.primary}1A`,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.text,
    },
    placeholder: {
        width: 40,
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 8,
    },
    sectionDescription: {
        fontSize: 14,
        color: colors.secondary,
        marginBottom: 16,
        lineHeight: 20,
    },
    themesGrid: {
        gap: 16,
    },
    themeCard: {
        backgroundColor: `${colors.primary}08`,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: `${colors.primary}1A`,
    },
    selectedThemeCard: {
        borderColor: colors.primary,
        backgroundColor: `${colors.primary}15`,
    },
    comingSoonCard: {
        opacity: 0.6,
    },
    themeCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    themeIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    themeInfo: {
        flex: 1,
    },
    themeName: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 2,
    },
    themeDescription: {
        fontSize: 13,
        color: colors.secondary,
    },
    comingSoonText: {
        fontSize: 12,
        color: colors.secondary,
        fontWeight: '400',
    },
    themePreview: {
        height: 80,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border + '40',
    },
    previewHeader: {
        height: 24,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        borderBottomWidth: 1,
    },
    previewDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    previewLine: {
        height: 2,
        borderRadius: 1,
        flex: 1,
    },
    previewContent: {
        flex: 1,
        padding: 8,
        gap: 6,
    },
    previewAccent: {
        height: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        marginTop: 4,
    },
    comingSoonContainer: {
        alignItems: 'center',
        padding: 24,
        backgroundColor: `${colors.primary}08`,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: `${colors.primary}1A`,
        borderStyle: 'dashed',
    },
    comingSoonTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
        marginTop: 8,
        marginBottom: 4,
    },
    comingSoonSubtitle: {
        fontSize: 14,
        color: colors.secondary,
        textAlign: 'center',
    },
});
